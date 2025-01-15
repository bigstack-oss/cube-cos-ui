import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type NumberSpanProps = {
  number: number
  disabled?: boolean
}

const numberSpan = cva(undefined, {
  variants: {
    disabled: {
      false: ['bg-cosmos-secondary text-functional-text'],
      true: ['bg-secondary-150 text-functional-text-light'],
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const NumberSpan = (props: NumberSpanProps) => {
  const { number, disabled } = props

  const text = number > 99 ? 'N' : number

  return (
    <span
      className={twMerge(
        'secondary-body7 ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] font-extrabold',
        numberSpan({
          disabled,
        }),
      )}
    >
      {text}
    </span>
  )
}
