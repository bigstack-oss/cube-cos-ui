import { useMemo } from 'react'
import { calculateFillWidthPercentage } from './cosProgressBarUtils'

type UseOverThreshold = {
  overThresholdProgress: number
  overThresholdFillWidthPercentage: number
}

export const useOverThreshold = (
  barWidth: number,
  progress: number,
): UseOverThreshold => {
  const overThresholdProgress = Math.max(0, progress - 100)

  const overThresholdFillWidthPercentage = useMemo<number>(() => {
    return calculateFillWidthPercentage(overThresholdProgress, barWidth)
  }, [barWidth, overThresholdProgress])

  return {
    overThresholdFillWidthPercentage,
    overThresholdProgress,
  }
}
