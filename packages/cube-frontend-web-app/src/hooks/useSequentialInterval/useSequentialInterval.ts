import { useSyncedRef } from '@cube-frontend/utils'
import { useEffect } from 'react'

export type UseSequentialIntervalOptions = {
  /**
   * @default true
   */
  immediate?: boolean
}

/**
 * Unlike `useInterval`, `useSequentialInterval` waits for the previous callback
 * to finish before running the next one. The delay starts only after the callback
 * completes, whether it succeeds or fails.
 */
export const useSequentialInterval = (
  callback: (() => void) | (() => Promise<void>),
  delay: number,
  options?: UseSequentialIntervalOptions,
) => {
  const { immediate = true } = options ?? {}

  const callbackRef = useSyncedRef(callback)

  useEffect(() => {
    let firstRunTimerId: NodeJS.Timeout | undefined = undefined
    let sequentialRunTimerId: NodeJS.Timeout

    const sequentialRun = async () => {
      try {
        await callbackRef.current()
      } finally {
        sequentialRunTimerId = setTimeout(() => {
          sequentialRun()
        }, delay)
      }
    }

    if (immediate) {
      sequentialRun()
    } else {
      firstRunTimerId = setTimeout(() => {
        sequentialRun()
      }, delay)
    }

    return () => {
      clearTimeout(firstRunTimerId)
      clearTimeout(sequentialRunTimerId)
    }
  }, [callbackRef, delay, immediate])
}
