import { useSyncedRef } from '@cube-frontend/utils'
import { useEffect } from 'react'

export type UseIntervalOptions = {
  immediate?: boolean
}

export const useInterval = (
  callback: () => void,
  delay: number,
  options?: UseIntervalOptions,
) => {
  const { immediate = true } = options || {}

  const callbackRef = useSyncedRef(callback)

  useEffect(() => {
    if (immediate) {
      callbackRef.current()
    }

    const interval = setInterval(() => {
      callbackRef.current()
    }, delay)
    return () => clearInterval(interval)
  }, [callbackRef, delay, immediate])
}
