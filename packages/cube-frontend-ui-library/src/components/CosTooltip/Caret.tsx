import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { CSSProperties } from 'react'
import { twMerge } from 'tailwind-merge'
import { HorizontalPlacement } from '../../internal/utils/floating/types'

export type CaretProps = {
  horizontalPlacement: HorizontalPlacement
  style?: CSSProperties
}

const caret = cva(
  'inline-block size-0 border-[6px] border-t-0 border-solid border-transparent border-b-dark-700',
  {
    variants: {
      horizontalPlacement: {
        left: 'ml-4 self-start',
        center: 'self-center',
        right: 'mr-4 self-end',
      } satisfies Record<HorizontalPlacement, ClassValue>,
    },
  },
)

export const Caret = (props: CaretProps) => {
  const { horizontalPlacement, style } = props

  return (
    <span className={twMerge(caret({ horizontalPlacement }))} style={style} />
  )
}
