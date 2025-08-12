import { isAxiosError, isCancel } from 'axios'
import { RefObject, useCallback, useRef, useState } from 'react'
import { CosGetApiRequest } from './cosGetRequestUtils'
import { CosMutationApiRequest } from './cosMutationRequestUtils'
import {
  CosApiError,
  CosRequestError,
  getNativeError,
  isCosApiResponse,
} from './cosRequestUtils'

export type UseCosRequestHandler<Data> = {
  isLoading: boolean
  /**
   * Indicates if a response has been received by this request handler.
   */
  hasResponseBeenReceived: boolean
  data: Data | undefined
  errorState: CosRequestError | undefined
  abortControllerRef: RefObject<AbortController>
  oversee: (
    request: CosGetApiRequest<Data> | CosMutationApiRequest<Data>,
  ) => Promise<Data>
  clearError: () => void
}

export type UseCosRequestHandlerOptions = {
  defaultIsLoading: boolean
}

export const INTERNAL_useCosRequestHandler = <Data>(
  options: UseCosRequestHandlerOptions,
): UseCosRequestHandler<Data> => {
  const { defaultIsLoading } = options

  const [isLoading, setIsLoading] = useState(defaultIsLoading)
  const [hasResponseBeenReceived, setHasResponseBeenReceived] = useState(false)
  const [data, setData] = useState<Data | undefined>()
  const [errorState, setErrorState] = useState<CosRequestError | undefined>()

  const abortControllerRef = useRef(new AbortController())

  const oversee = async (
    request: CosGetApiRequest<Data> | CosMutationApiRequest<Data>,
  ): Promise<Data> => {
    setIsLoading(true)
    setErrorState(undefined)

    try {
      const response = await request()
      setData(response.data.data)
      setHasResponseBeenReceived(true)
      setIsLoading(false)
      return response.data.data as Data
    } catch (error) {
      if (isAxiosError(error) && isCosApiResponse(error.response)) {
        const cosApiResponse = error.response

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
        setData(undefined)
        setIsLoading(false)

        throw nextErrorState
      } else if (!isCancel(error)) {
        setErrorState({
          native: getNativeError(error),
          api: undefined,
        })
        setData(undefined)
        setIsLoading(false)
      }

      throw error
    }
  }

  const clearError = useCallback((): void => {
    setErrorState(undefined)
  }, [])

  return {
    isLoading,
    hasResponseBeenReceived,
    data,
    errorState,
    abortControllerRef,
    oversee,
    clearError,
  }
}
