import { useSyncedRef } from '@cube-frontend/utils'
import { useCallback, useEffect, useRef } from 'react'

export type UseCarouselAutoPlay = {
  startAutoPlay: () => void
  stopAutoPlay: () => void
}

export type UseCarouselAutoPlayOptions = {
  interval: number
  onIntervalReached: () => void
}

export const useCarouselAutoPlay = (
  options: UseCarouselAutoPlayOptions,
): UseCarouselAutoPlay => {
  const { interval, onIntervalReached } = options

  const intervalIdRef = useRef<number | undefined>(undefined)
  const onIntervalReachedRef = useSyncedRef(onIntervalReached)

  const startAutoPlay = useCallback((): void => {
    if (intervalIdRef.current !== undefined) {
      console.warn('Auto play has already started.')
      return
    }

    intervalIdRef.current = setInterval(() => {
      onIntervalReachedRef.current()
    }, interval)
  }, [interval, onIntervalReachedRef])

  const stopAutoPlay = useCallback((): void => {
    clearInterval(intervalIdRef.current)
    intervalIdRef.current = undefined
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => {
      stopAutoPlay()
    }
  }, [startAutoPlay, stopAutoPlay])

  return {
    startAutoPlay,
    stopAutoPlay,
  }
}
