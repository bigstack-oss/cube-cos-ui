import { PropsWithChildren } from 'react'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

type CosPaginationItemWrapProps = PropsWithChildren<{ isMinimal: boolean }>

const wrap = cva('secondary-body2 flex text-center', {
  variants: {
    isMinimal: {
      true: 'p-[3.5px]',
      false: 'p-1.5',
    },
  },
})

export const CosPaginationItemWrap = (props: CosPaginationItemWrapProps) => {
  const { isMinimal, children } = props

  return <div className={twMerge(wrap({ isMinimal }))}>{children}</div>
}
