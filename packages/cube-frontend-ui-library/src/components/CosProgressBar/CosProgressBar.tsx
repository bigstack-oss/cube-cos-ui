import { CSSProperties } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosProgressBarSkeleton } from './CosProgressBarSkeleton'
import { BackgroundColorClass } from '@cube-frontend/ui-theme'
import { useFillWidth } from './useFillWidth'

export type CosProgressBarProps = {
  /**
   * An integer between 0 and 100 indicating the progress (percentage).
   */
  progress: number
} & PropsWithClassName

const progressCva = cva('absolute h-full', {
  variants: {
    isFull: {
      true: 'rounded-full',
      false: 'rounded-l-full',
    },
  },
})

const getProgressColor = (progress: number): BackgroundColorClass => {
  if (progress <= 50) {
    return 'bg-chart-1'
  } else if (progress > 50 && progress <= 80) {
    return 'bg-status-warning'
  }
  return 'bg-status-negative'
}

export const CosProgressBar = (props: CosProgressBarProps) => {
  const { className: classNameProps, progress } = props

  if (progress < 0) {
    console.warn('progress value should not be less than 0')
  }

  const {
    barRef,
    fillWidthPercentage,
    overThresholdFillWidthPercentage,
    overThresholdProgress,
  } = useFillWidth(progress)

  // Use inline style because dynamic value is not supported in TailwindCSS.
  const progressWidthStyle: CSSProperties = {
    width: `${fillWidthPercentage}%`,
  }

  const overThresholdProgressWidthStyle: CSSProperties = {
    width: `${overThresholdFillWidthPercentage}%`,
  }

  const className = twMerge(
    'inline-flex w-full shrink-0 items-center gap-x-[6px]',
    classNameProps,
  )

  const color = getProgressColor(progress)

  return (
    <div className={className}>
      <div
        ref={barRef}
        className="relative h-[9px] w-full rounded-full bg-functional-border-divider"
      >
        <div
          className={twMerge(
            progressCva({
              isFull: progress >= 100,
            }),
            color,
          )}
          style={progressWidthStyle}
        />
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
      </div>
      <span className="primary-body5 text-functional-text">{`${Math.round(progress)}%`}</span>
    </div>
  )
}

CosProgressBar.Skeleton = CosProgressBarSkeleton
