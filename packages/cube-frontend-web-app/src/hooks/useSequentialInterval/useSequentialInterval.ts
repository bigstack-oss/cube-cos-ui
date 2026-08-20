import { useSyncedRef } from '@cube-frontend/utils'
import { useCallback, useEffect, useRef } from 'react'

export type UseSequentialIntervalOptions = {
  /**
   * @default true
   */
  immediate?: boolean
}

type StartIntervalOptions = {
  /**
   * Overrides the hook-level `immediate` option for this restart only.
   */
  immediate?: boolean
}

type UseSequentialInterval = {
  startInterval: (options?: StartIntervalOptions) => void
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

  const firstRunTimerIdRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  )
  const sequentialRunTimerIdRef = useRef<
    ReturnType<typeof setTimeout> | undefined
  >(undefined)

  const stopInterval = useCallback(() => {
    clearTimeout(firstRunTimerIdRef.current)
    clearTimeout(sequentialRunTimerIdRef.current)
  }, [])

  const callbackRef = useSyncedRef(callback)

  const startInterval = useCallback(
    (startOptions?: StartIntervalOptions) => {
      stopInterval()

      const runFirstImmediately = startOptions?.immediate ?? immediate

      const sequentialRun = async () => {
        try {
          await callbackRef.current()
        } finally {
          sequentialRunTimerIdRef.current = setTimeout(() => {
            sequentialRun()
          }, delay)
        }
      }

      if (runFirstImmediately) {
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
    },
    [stopInterval, callbackRef, delay, immediate],
  )

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
