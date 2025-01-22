import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type CosCheckboxGridDirection = 'vertical' | 'wrap'

export type CosCheckboxGridProps = PropsWithChildren<{
  className?: string
  direction: CosCheckboxGridDirection
}>

export const CosCheckboxGrid = (props: CosCheckboxGridProps) => {
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
