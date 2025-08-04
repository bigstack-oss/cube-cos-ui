/* eslint-disable react-hooks/rules-of-hooks */
import { useEffect } from 'react'
import type { CosGetRequestMiddleware } from '../cosGetRequestUtils'
import { isNullish, silentPromise } from '../cosRequestUtils'

export const fetchOnMount: CosGetRequestMiddleware = (getRequestHook) => {
  const { getResource, getParam } = getRequestHook

  useEffect(() => {
    if (!getParam || !isNullish(getParam())) {
      silentPromise(getResource)
    }
    // `getParam` is intentionally omitted from the dependency array because
    // its reference changes on every render, and this middleware is designed
    // to fetch data only once when on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getResource])

  return getRequestHook
}
