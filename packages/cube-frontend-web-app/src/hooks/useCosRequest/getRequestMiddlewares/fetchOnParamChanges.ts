/* eslint-disable react-hooks/rules-of-hooks */
import { isEqual } from 'lodash'
import { useEffect, useRef } from 'react'
import type { CosGetRequestMiddleware } from '../cosGetRequestUtils'
import { isNullish, Nullish, silentPromise } from '../cosRequestUtils'
import type { UseCosGetRequest } from '../useCosGetRequest'

export const fetchOnParamChanges: CosGetRequestMiddleware = <Data>(
  getRequestHook: UseCosGetRequest<Data>,
) => {
  const { getResource, getParam } = getRequestHook

  const prevParamRef = useRef<Nullish<unknown>>(undefined)
  // Since `getParam` might return `undefined`, we use this ref to explicitly
  // track whether prev param has been initialized.
  const isPrevParamInitializedRef = useRef(false)

  useEffect(() => {
    if (!isPrevParamInitializedRef.current) {
      prevParamRef.current = getParam?.()
      isPrevParamInitializedRef.current = true
      return
    }

    const newParam = getParam?.()
    const isParamChanged =
      !isNullish(newParam) && !isEqual(prevParamRef.current, newParam)

    if (isParamChanged) {
      silentPromise(getResource)
    }

    prevParamRef.current = newParam
  }, [getParam, getResource])

  return getRequestHook
}
