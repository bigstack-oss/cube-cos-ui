import { PropsWithClassName } from '@cube-frontend/utils'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { twMerge } from 'tailwind-merge'

export type CosIconTextProps = PropsWithClassName & {
  type: CosIconTextType
  children: string
}

export type CosIconTextType =
  | 'primary'
  | 'warning'
  | 'error'
  | 'functional'
  | 'secondary'
  | 'positive'
  | 'primary-outline'

const iconText = cva(
  'secondary-body4 rounded px-1 py-0.5 text-center font-semibold text-grey-0',
  {
    variants: {
      type: {
        primary: 'bg-cosmos-primary',
        warning: 'bg-status-paused',
        error: 'bg-status-negative',
        functional: 'bg-functional-text',
        secondary: 'bg-cosmos-secondary text-functional-text',
        positive: 'bg-status-positive',
        'primary-outline': [
          'secondary-body5 font-medium text-cosmos-primary',
          'border border-cosmos-primary bg-grey-0 px-[5px]',
        ],
      } satisfies Record<CosIconTextType, ClassValue>,
    },
  },
)

export const CosIconText = (props: CosIconTextProps) => {
  const { className, type, children } = props

  return (
    <span
      className={twMerge(
        iconText({
          type,
        }),
        className,
      )}
    >
      {children}
    </span>
  )
}
