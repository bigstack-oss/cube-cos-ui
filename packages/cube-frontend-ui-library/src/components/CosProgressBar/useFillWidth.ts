import { RefObject, useEffect, useMemo, useRef, useState } from 'react'

type UseFillWidth = {
  barRef: RefObject<HTMLDivElement | null>
  overThresholdProgress: number
  fillWidthPercentage: number
  overThresholdFillWidthPercentage: number
}

const MIN_TRACK_WIDTH = 16
const MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE = 4

const calculateFillWidthPercentage = (
  progressProp: number,
  barWidth: number,
): number => {
  if (progressProp >= 100) {
    return 100
  }

  if (progressProp <= 0 || barWidth <= MIN_TRACK_WIDTH) {
    return progressProp
  }

  let progress = progressProp
  let filledWidth = 0
  let blankWidth = 0

  const updateWidths = (): void => {
    filledWidth = barWidth * (progress / 100)
    blankWidth = barWidth - filledWidth
  }

  updateWidths()

  if (filledWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE) {
    while (filledWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE && progress < 100) {
      progress++
      updateWidths()
    }
  } else if (blankWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE) {
    while (blankWidth < MIN_WIDTH_FOR_RADIUS_TO_BE_VISIBLE && progress > 0) {
      progress--
      updateWidths()
    }
  }

  return progress
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

  const overThresholdProgress = Math.max(0, progressProp - 100)

  const overThresholdFillWidthPercentage = useMemo<number>(() => {
    return calculateFillWidthPercentage(overThresholdProgress, barWidth)
  }, [barWidth, overThresholdProgress])

  return {
    barRef,
    fillWidthPercentage,
    overThresholdFillWidthPercentage,
    overThresholdProgress,
  }
}
