import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type CosRadioButtonGridDirection = 'vertical' | 'wrap'

export type CosRadioButtonGridProps = PropsWithChildren<{
  className?: string
  direction: CosRadioButtonGridDirection
}>

export const CosRadioButtonGrid = (props: CosRadioButtonGridProps) => {
  const { children, className, direction } = props
  return direction === 'vertical' ? (
    <div className={twMerge('flex flex-col gap-y-3', className)}>
      {children}
    </div>
  ) : (
    <div
      className={twMerge(
        'grid grid-cols-[repeat(auto-fill,180px)] gap-x-4 gap-y-6',
        className,
      )}
    >
      {children}
    </div>
  )
}
