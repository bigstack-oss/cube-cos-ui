import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export type CosRadioButtonGroupDirection = 'vertical' | 'wrap'

export type CosRadioButtonGroupProps = PropsWithChildren<{
  className?: string
  direction: CosRadioButtonGroupDirection
}>

export const CosRadioButtonGroup = (props: CosRadioButtonGroupProps) => {
  const { children, className: classNameProp, direction } = props

  const className = twMerge(
    direction === 'vertical'
      ? 'flex flex-col gap-y-3'
      : 'grid grid-cols-[repeat(auto-fill,180px)] gap-x-4 gap-y-6',
    classNameProp,
  )

  return <div className={className}>{children}</div>
}
