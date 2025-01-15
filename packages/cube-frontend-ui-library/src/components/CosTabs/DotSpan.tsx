import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'

export type DotSpanProps = {
  disabled?: boolean
}

const dotSpan = cva(undefined, {
  variants: {
    disabled: {
      false: ['bg-cosmos-secondary'],
      true: ['bg-secondary-150'],
    },
  },
  defaultVariants: {
    disabled: false,
  },
})

export const DotSpan = (props: DotSpanProps) => {
  const { disabled } = props

  return (
    <span
      className={twMerge(
        'ml-2.5 size-1 shrink-0 rounded-full',
        dotSpan({
          disabled,
        }),
      )}
    />
  )
}
