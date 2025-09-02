import { RefObject, useEffect, useMemo, useRef, useState } from 'react'
import { calculateFillWidthPercentage } from './cosProgressBarUtils'

type UseFillWidth = {
  barRef: RefObject<HTMLDivElement | null>
  barWidth: number
  fillWidthPercentage: number
}

/**
 * If the bar width is too small, the filled area will be too short for the
 * border-radius to appear. Likewise, if the filled area is too long, the
 * remaining blank space will be too narrow for the trailing border-radius
 * to show.
 * Thus, instead of using the user-provided `progress`, we should calculate a
 * value that ensures either the filled area or the trailing blank space is
 * wide enough.
 */
export const useFillWidth = (progressProp: number): UseFillWidth => {
  const [barWidth, setBarWidth] = useState(0)

  const barRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const observer = new ResizeObserver(([entry]) => {
      setBarWidth(entry.contentRect.width)
    })

    const bar = barRef.current
    if (bar) {
      observer.observe(bar)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const fillWidthPercentage = useMemo<number>(
    () => calculateFillWidthPercentage(progressProp, barWidth),
    [progressProp, barWidth],
  )

  return {
    barRef,
    barWidth,
    fillWidthPercentage,
  }
}
