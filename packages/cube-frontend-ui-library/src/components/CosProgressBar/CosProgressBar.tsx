import { BackgroundColorClass } from '@cube-frontend/ui-theme'
import { PropsWithClassName } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'

export type CosProgressBarProps = {
  color: BackgroundColorClass
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

export const CosProgressBar = (props: CosProgressBarProps) => {
  const { className: classNameProps, color, progress } = props

  // Use inline style because dynamic value is not supported in TailwindCSS.
  const progressWidthStyle: CSSProperties = {
    width: `${Math.min(progress, 100)}%`,
  }

  if (progress < 0) {
    console.warn('progress value should not be less than 0')
  }

  const className = twMerge(
    'inline-flex w-full items-center gap-x-[6px]',
    classNameProps,
  )

  return (
    <div className={className}>
      <div className="relative h-[9px] w-full rounded-full bg-functional-border-divider">
        <div
          className={twMerge(
            progressCva({
              isFull: progress >= 100,
            }),
            color,
          )}
          style={progressWidthStyle}
        />
      </div>
      <span className="primary-body5 text-functional-text">{`${progress}%`}</span>
    </div>
  )
}
