import { cva } from 'class-variance-authority'

export type CosNumberSpanProps = {
  number: number
  disabled?: boolean
}

const numberSpan = cva(
  'secondary-body7 ml-1 inline-flex size-4 shrink-0 items-center justify-center rounded-full text-[9px] font-extrabold',
  {
    variants: {
      disabled: {
        false: ['bg-cosmos-secondary text-functional-text'],
        true: ['bg-secondary-150 text-functional-text-light'],
      },
    },
    defaultVariants: {
      disabled: false,
    },
  },
)

export const CosNumberSpan = (props: CosNumberSpanProps) => {
  const { number, disabled } = props

  const text = number > 99 ? 'N' : number

  return (
    <span
      className={numberSpan({
        disabled,
      })}
    >
      {text}
    </span>
  )
}
