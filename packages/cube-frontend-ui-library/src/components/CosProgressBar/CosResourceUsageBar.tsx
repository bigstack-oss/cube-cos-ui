import { BackgroundColorClass } from '@cube-frontend/ui-theme'
import { CSSProperties, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  CosProgressBar,
  CosProgressBarProps,
  CosProgressBarRef,
} from './CosProgressBar'
import { CosProgressBarSkeleton } from './CosProgressBarSkeleton'
import { progressCva } from './cosProgressBarUtils'
import { useOverThreshold } from './useOverThreshold'

type CosResourceUsageBarProps = Pick<
  CosProgressBarProps,
  'className' | 'progress'
>

const getProgressColor = (progress: number): BackgroundColorClass => {
  if (progress <= 50) {
    return 'bg-chart-1'
  } else if (progress > 50 && progress <= 80) {
    return 'bg-status-warning'
  }
  return 'bg-status-negative'
}

export const CosResourceUsageBar = (props: CosResourceUsageBarProps) => {
  const { className, progress } = props

  const cosProgressBarRef = useRef<CosProgressBarRef | null>(null)

  const { overThresholdFillWidthPercentage, overThresholdProgress } =
    useOverThreshold(cosProgressBarRef.current?.barWidth ?? 0, progress)

  const overThresholdProgressWidthStyle: CSSProperties = {
    width: `${overThresholdFillWidthPercentage}%`,
  }

  const color = getProgressColor(progress)

  return (
    <CosProgressBar
      ref={cosProgressBarRef}
      className={className}
      progress={progress}
      color={color}
    >
      {overThresholdFillWidthPercentage > 0 && (
        <div
          className={twMerge(
            progressCva({
              isFull: overThresholdProgress >= 100,
            }),
            'bg-status-over-limit',
          )}
          style={overThresholdProgressWidthStyle}
        />
      )}
    </CosProgressBar>
  )
}

CosResourceUsageBar.Skeleton = CosProgressBarSkeleton
