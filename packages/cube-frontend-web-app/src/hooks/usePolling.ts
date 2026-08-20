import { useEffect, useState } from 'react'
import { useSequentialInterval } from './useSequentialInterval/useSequentialInterval'

export type UsePollingOptions = {
  /**
   * @default false
   */
  immediate?: boolean
  /**
   * Stops polling while the browser tab is hidden, and polls once as soon as it
   * becomes visible again. Use it when a poll is expensive enough that paying
   * for it with nobody watching is wasteful.
   * @default false
   */
  pauseWhenHidden?: boolean
}

export type UsePolling = {
  isPolling: boolean
  startPolling: () => void
  stopPolling: () => void
}

export const usePolling = <Data>(
  fetch: () => Promise<Data>,
  interval: number,
  options?: UsePollingOptions,
): UsePolling => {
  const { immediate = false, pauseWhenHidden = false } = options ?? {}

  const [isPolling, setIsPolling] = useState(false)

  const isTabHidden = () =>
    pauseWhenHidden && document.visibilityState === 'hidden'

  const pollingFn = async () => {
    // A request already in flight when the tab hides re-schedules the next run
    // from its own `finally`, so the timer alone cannot be trusted — check
    // again here, right before spending a request.
    if (isTabHidden()) return

    setIsPolling(true)
    try {
      await fetch()
    } finally {
      setIsPolling(false)
    }
  }

  const { startInterval, stopInterval } = useSequentialInterval(
    pollingFn,
    interval,
    { immediate },
  )

  useEffect(() => {
    if (!pauseWhenHidden) return

    const onVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        stopInterval()
      } else {
        startInterval({ immediate: true })
      }
    }

    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
    }
  }, [pauseWhenHidden, startInterval, stopInterval])

  return {
    isPolling,
    startPolling: startInterval,
    stopPolling: stopInterval,
  }
}
