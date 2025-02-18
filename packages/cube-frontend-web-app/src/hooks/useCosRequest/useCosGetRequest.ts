import { useSyncedRef } from '@cube-frontend/utils'
import { isEqual } from 'lodash'
import { useCallback, useEffect, useRef } from 'react'
import {
  CosApiResponse,
  GetParamFn,
  isNullish,
  Nullish,
} from './cosRequestUtils'
import {
  INTERNAL_useCosRequestHandler,
  UseCosRequestHandler,
} from './useCosRequestHandler'

export type UseCosGetRequest<Data> = Omit<
  UseCosRequestHandler<Data>,
  'oversee'
> & {
  getResource: () => Promise<Data>
}

export type UseCosGetRequestOptions = {
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

type NullaryRequest<T> = () => Promise<CosApiResponse<T>>
type UnaryRequest<T, Param> = (param: Param) => Promise<CosApiResponse<T>>

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
  getParamOrOptions?: GetParamFn<Param> | UseCosGetRequestOptions,
  options?: UseCosGetRequestOptions,
) => {
  const { fetchOnMount = true, fetchOnParamChanges = true } =
    ((options ?? getParamOrOptions) as UseCosGetRequestOptions | undefined) ??
    {}

  const computeGetParamFn = useCallback((): GetParamFn<Param> | undefined => {
    if (typeof getParamOrOptions === 'function') {
      return getParamOrOptions
    } else {
      return undefined
    }
  }, [getParamOrOptions])

  const isMountedRef = useRef(false)
  const getParamFnRef = useSyncedRef<GetParamFn<Param> | undefined>(
    computeGetParamFn(),
  )
  const prevParamRef = useRef<Nullish<Param>>(undefined)

  const { oversee, ...requestHandlerAttrs } =
    INTERNAL_useCosRequestHandler<Data>({
      defaultIsLoading: true,
    })

  // Dynamic request functions are discouraged and not supported.
  const getResource = useCallback((): Promise<Data> => {
    const getParamFn = getParamFnRef.current
    if (getParamFn) {
      return oversee(() => request(getParamFn() as Param))
    } else {
      return oversee(() => (request as NullaryRequest<Data>)())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const silentGetResource = useCallback(async (): Promise<void> => {
    try {
      await getResource()
    } catch (error) {
      // Ignore auto-fetch errors because they can't be caught
      // unless an error boundary is used.
      console.error(error)
    }
  }, [getResource])

  // Effect for getting resource on param changes.
  useEffect(() => {
    if (isMountedRef.current && fetchOnParamChanges) {
      const newParam = getParamFnRef.current?.()
      if (!isNullish(newParam) && !isEqual(prevParamRef.current, newParam)) {
        silentGetResource()
      }
      prevParamRef.current = newParam
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchOnParamChanges, computeGetParamFn])

  // Effect for getting resource on mount.
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true
      if (fetchOnMount) {
        const getParamFn = getParamFnRef.current
        if (getParamFn) {
          const param = getParamFn()
          if (!isNullish(param)) {
            silentGetResource()
          }
          prevParamRef.current = param
        } else {
          silentGetResource()
        }
      }
    }

    return () => {
      // Reset `isMounted` back to `false` for Strict Mode, as another effect
      // for getting resource on param changes relies on this flag.
      isMountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    ...requestHandlerAttrs,
    getResource,
  }
}
