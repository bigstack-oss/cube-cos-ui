import { useState } from 'react'
import { useSequentialInterval } from './useSequentialInterval/useSequentialInterval'

export type UsePollingOptions = {
  /**
   * @default false
   */
  immediate?: boolean
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
  const { immediate = false } = options ?? {}

  const [isPolling, setIsPolling] = useState(false)

  const pollingFn = async () => {
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

  return {
    isPolling,
    startPolling: startInterval,
    stopPolling: stopInterval,
  }
}
