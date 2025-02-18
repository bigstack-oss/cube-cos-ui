import { isEqual } from 'lodash'
import { useCallback, useEffect, useRef, useState } from 'react'
import {
  CosApiError,
  CosApiInnerResponse,
  CosApiResponse,
  CosRequestError,
  getNativeError,
  GetParamFn,
  isCosApiResponse,
  isNullish,
  Nullish,
  readStream,
} from './cosRequestUtils'
import { AxiosRequestConfig, isAxiosError, isCancel } from 'axios'

export type UseCosStreamRequest<Data> = {
  isLoading: boolean
  data: Data | undefined
  errorState: CosRequestError | undefined
}

type StreamParam = {
  watch?: boolean
}

type StreamRequest<T, Param extends StreamParam> = (
  param: Param,
  options: AxiosRequestConfig,
) => Promise<CosApiResponse<T>>

type UseCosStreamRequestHook = {
  <Data, Param extends StreamParam>(
    request: StreamRequest<Data, Param>,
    /**
     * `getParam` function must not be memoized.
     */
    getParam: () => Nullish<Param>,
  ): UseCosStreamRequest<Data>
}

export const useCosStreamRequest: UseCosStreamRequestHook = <
  Data,
  Param extends StreamParam,
>(
  /**
   * Dynamic request functions are discouraged and not supported.
   */
  request: StreamRequest<Data, Param>,
  getParam: GetParamFn<Param>,
) => {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState<Data | undefined>()
  const [errorState, setErrorState] = useState<CosRequestError | undefined>()

  const requestRef = useRef(request)
  const isFirstStreamResponseRef = useRef(true)
  const abortControllerRef = useRef<AbortController | null>(null)

  const subscribe = useCallback(async (param: Param) => {
    setData(undefined)
    setIsLoading(true)
    setErrorState(undefined)

    try {
      abortControllerRef.current = new AbortController()

      const response = await requestRef.current(
        { ...param, watch: true },
        {
          responseType: 'stream',
          adapter: 'fetch',
          signal: abortControllerRef.current.signal,
        },
      )

      readStream<CosApiInnerResponse<Data>>(
        response.data as unknown as ReadableStream,
        (chunkRes) => {
          if (isFirstStreamResponseRef.current) {
            isFirstStreamResponseRef.current = false
            setIsLoading(false)
          }

          setData(chunkRes.data)
        },
      )
    } catch (error) {
      // Ignore fetch cancellation
      if (isCancel(error)) {
        return
      }

      // TODO: handle subscribe error retry.

      if (isAxiosError(error) && isCosApiResponse(error.response?.data)) {
        const cosApiResponse = error.response.data

        const apiError: CosApiError = {
          code: cosApiResponse.data.code,
          msg: cosApiResponse.data.msg,
          status: cosApiResponse.data.status,
        }

        const nextErrorState: CosRequestError = {
          native: error,
          api: apiError,
        }

        setErrorState(nextErrorState)

        throw nextErrorState
      } else {
        setErrorState({
          native: getNativeError(error),
          api: undefined,
        })
      }

      console.error(error)
      setIsLoading(false)
      throw error
    }
  }, [])

  const unsubscribe = useCallback(() => {
    isFirstStreamResponseRef.current = true
    abortControllerRef.current?.abort()
    abortControllerRef.current = null
  }, [])

  const [param, setParam] = useState(getParam())

  useEffect(() => {
    const newParam = getParam()
    if (!isEqual(param, newParam)) {
      setParam(newParam)
    }
  }, [getParam, param])

  useEffect(() => {
    if (!isNullish(param)) {
      subscribe(param)
    }
    return () => {
      unsubscribe()
    }
  }, [subscribe, unsubscribe, param])

  return {
    data,
    isLoading,
    errorState,
  }
}
