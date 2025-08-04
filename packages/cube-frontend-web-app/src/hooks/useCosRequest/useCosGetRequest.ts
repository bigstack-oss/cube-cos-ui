import { useSyncedRef } from '@cube-frontend/utils'
import { RawAxiosRequestConfig } from 'axios'
import { useCallback, useEffect } from 'react'
import {
  CosGetApiResponse,
  CosGetRequestMiddleware,
} from './cosGetRequestUtils'
import { GetParamFn, Nullish } from './cosRequestUtils'
import { fetchOnMount } from './getRequestMiddlewares/fetchOnMount'
import { fetchOnParamChanges } from './getRequestMiddlewares/fetchOnParamChanges'
import {
  INTERNAL_useCosRequestHandler,
  UseCosRequestHandler,
} from './useCosRequestHandler'

export type UseCosGetRequest<Data> = Omit<
  UseCosRequestHandler<Data>,
  'abortControllerRef' | 'oversee'
> & {
  /**
   * The reference of this function is stable.
   */
  getResource: () => Promise<Data>
  /**
   * The reference of this function is unstable.
   */
  getParam: GetParamFn<unknown> | undefined
}

type UseCosGetRequestOptions = {
  /**
   * Whether to automatically fetch data on component mount.
   * @default true
   */
  fetchOnMount?: boolean
  /**
   * Whether to automatically fetch data when the `getParams` function returns a different value.
   * @default true
   */
  fetchOnParamChanges?: boolean
}

type NullaryRequest<T> = (
  config?: RawAxiosRequestConfig,
) => Promise<CosGetApiResponse<T>>
type UnaryRequest<T, Param> = (
  param: Param,
  config?: RawAxiosRequestConfig,
) => Promise<CosGetApiResponse<T>>

type UseCosGetRequestHook = {
  <Data>(
    request: NullaryRequest<Data>,
    options?: UseCosGetRequestOptions,
  ): UseCosGetRequest<Data>
  <Data, Param>(
    request: UnaryRequest<Data, Param>,
    /**
     * `getParam` function must not be memoized.
     */
    getParam: () => Nullish<Param>,
    options?: UseCosGetRequestOptions,
  ): UseCosGetRequest<Data>
}

export const useCosGetRequest: UseCosGetRequestHook = <Data, Param>(
  /**
   * Dynamic request functions are discouraged and not supported.
   */
  request: NullaryRequest<Data> | UnaryRequest<Data, Param>,
  optionsOrGetParam?: UseCosGetRequestOptions | GetParamFn<Param>,
  options?: UseCosGetRequestOptions,
) => {
  const {
    fetchOnMount: fetchOnMountOption = true,
    fetchOnParamChanges: fetchOnParamChangesOption = true,
  } =
    ((options ?? optionsOrGetParam) as UseCosGetRequestOptions | undefined) ??
    {}

  const { abortControllerRef, oversee, ...requestHandlerAttrs } =
    INTERNAL_useCosRequestHandler<Data>({
      defaultIsLoading: true,
    })

  const getGetParamFn = (): GetParamFn<Param> | undefined => {
    if (typeof optionsOrGetParam === 'function') {
      return optionsOrGetParam
    }
    return undefined
  }

  const getMiddlewares = (): CosGetRequestMiddleware[] => {
    const middlewares: CosGetRequestMiddleware[] = []

    if (fetchOnMountOption) {
      middlewares.push(fetchOnMount)
    }

    if (fetchOnParamChangesOption) {
      middlewares.push(fetchOnParamChanges)
    }

    return middlewares
  }

  const getParamFnRef = useSyncedRef<GetParamFn<Param> | undefined>(
    getGetParamFn(),
  )

  // Dynamic request functions are discouraged and not supported.
  const getResource = useCallback((): Promise<Data> => {
    // Abort the previous request.
    abortControllerRef.current.abort()
    // Create a new abort controller for the next request.
    abortControllerRef.current = new AbortController()

    const getParamFn = getParamFnRef.current
    const config: RawAxiosRequestConfig = {
      signal: abortControllerRef.current.signal,
    }

    if (getParamFn) {
      return oversee(() =>
        (request as UnaryRequest<Data, Param>)(getParamFn() as Param, config),
      )
    } else {
      return oversee(() => (request as NullaryRequest<Data>)(config))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Abort request on unmount.
  useEffect(() => {
    return () => {
      abortControllerRef.current.abort()
      // Create a new abort controller for StrictMode.
      abortControllerRef.current = new AbortController()
    }
  }, [abortControllerRef])

  const returnValue: ReturnType<UseCosGetRequestHook> = {
    ...requestHandlerAttrs,
    getResource,
    getParam: getGetParamFn(),
  }

  getMiddlewares()?.reduce(
    (prevReturn, middleware) => middleware(prevReturn),
    returnValue,
  )

  return returnValue
}
