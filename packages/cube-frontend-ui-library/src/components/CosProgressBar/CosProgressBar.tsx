import {
  CSSProperties,
  PropsWithChildren,
  Ref,
  useImperativeHandle,
  useMemo,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosProgressBarSkeleton } from './CosProgressBarSkeleton'
import { BackgroundColorClass } from '@cube-frontend/ui-theme'
import { useFillWidth } from './useFillWidth'
import { progressCva } from './cosProgressBarUtils'

export type CosProgressBarProps = {
  ref?: Ref<CosProgressBarRef>
  /**
   * An integer between 0 and 100 indicating the progress (percentage).
   */
  progress: number
  color: BackgroundColorClass
} & PropsWithClassName &
  PropsWithChildren

export type CosProgressBarRef = {
  barWidth: number
}

export const CosProgressBar = (props: CosProgressBarProps) => {
  const { ref, className: classNameProps, children, progress, color } = props

  if (progress < 0) {
    console.warn('progress value should not be less than 0')
  }

  const { barRef, barWidth, fillWidthPercentage } = useFillWidth(progress)

  useImperativeHandle(ref, () => ({
    barWidth,
  }))

  // Use inline style because dynamic value is not supported in TailwindCSS.
  const progressWidthStyle: CSSProperties = {
    width: `${fillWidthPercentage}%`,
  }

  const className = twMerge(
    'inline-flex w-full shrink-0 items-center gap-x-[6px]',
    classNameProps,
  )

  const displayPercentage = useMemo<number>(() => {
    if (progress === 0) return 0
    const rounded = Math.round(progress)
    return Math.max(1, rounded)
  }, [progress])

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
        {children}
      </div>
      <span className="primary-body5 text-functional-text">{`${displayPercentage}%`}</span>
    </div>
  )
}

CosProgressBar.Skeleton = CosProgressBarSkeleton
