import { useSyncedRef } from '@cube-frontend/utils'
import { useCallback, useEffect, useRef } from 'react'

export type UseSequentialIntervalOptions = {
  /**
   * @default true
   */
  immediate?: boolean
}

type UseSequentialInterval = {
  startInterval: () => void
  stopInterval: () => void
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
): UseSequentialInterval => {
  const { immediate = true } = options ?? {}

  const firstRunTimerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)
  const sequentialRunTimerIdRef = useRef<NodeJS.Timeout | undefined>(undefined)

  const stopInterval = useCallback(() => {
    clearTimeout(firstRunTimerIdRef.current)
    clearTimeout(sequentialRunTimerIdRef.current)
  }, [])

  const callbackRef = useSyncedRef(callback)

  const startInterval = useCallback(() => {
    stopInterval()

    const sequentialRun = async () => {
      try {
        await callbackRef.current()
      } finally {
        sequentialRunTimerIdRef.current = setTimeout(() => {
          sequentialRun()
        }, delay)
      }
    }

    if (immediate) {
      // Wrap immediate sequential run in a 0ms timeout to correctly stop the
      // first run in strict mode.
      firstRunTimerIdRef.current = setTimeout(() => {
        sequentialRun()
      }, 0)
    } else {
      firstRunTimerIdRef.current = setTimeout(() => {
        sequentialRun()
      }, delay)
    }
  }, [stopInterval, callbackRef, delay, immediate])

  useEffect(() => {
    startInterval()
    return () => {
      stopInterval()
    }
  }, [startInterval, stopInterval])

  return {
    startInterval,
    stopInterval,
  }
}
