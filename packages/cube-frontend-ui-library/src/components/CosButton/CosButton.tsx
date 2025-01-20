import { IconSize, SvgComponent } from '../CosIcon/CosIcon'
import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import { PropsWithClassName } from '@cube-frontend/utils'
import { getIconSizeClass } from '../CosIcon/utils'
import { CosLoadingSpinner } from '../CosLoadingSpinner/CosLoadingSpinner'
import { ClassValue } from 'class-variance-authority/types'

export type CosButtonType = 'primary' | 'secondary' | 'ghost' | 'warning'

export type CosButtonSize = 'sm' | 'md' | 'lg'

export type CosButtonProps = PropsWithClassName & {
  /**
   * @default "primary"
   */
  type?: CosButtonType
  /**
   * @default "md"
   */
  size?: CosButtonSize
  /**
   * default false
   */
  disabled?: boolean
  /**
   * @default false
   */
  loading?: boolean
  onClick?: () => void
} & (
    | {
        usage?: never
        children: string
      }
    | {
        usage: 'text-only'
        children: string
      }
    | {
        usage: 'icon-only'
        Icon: SvgComponent
      }
    | {
        usage: 'icon-left' | 'icon-right'
        children: string
        Icon: SvgComponent
      }
  )

export type CosButtonUsage = CosButtonProps['usage']

const button = cva(
  'flex shrink-0 items-center justify-center gap-x-2 rounded-[5px] font-urbanist font-semibold transition-colors disabled:cursor-default',
  {
    variants: {
      type: {
        primary: [
          'bg-primary text-grey-0',
          'hover:bg-functional-hover-primary',
          'disabled:bg-functional-disable-light disabled:text-functional-disable-text',
        ],
        secondary: [
          'border border-primary bg-grey-0 text-primary',
          'hover:border-functional-hover-primary hover:bg-functional-hover-secondary',
          'disabled:border-functional-disable-text disabled:bg-grey-0 disabled:text-functional-disable-text',
        ],
        ghost: [
          'bg-transparent text-primary',
          'hover:bg-functional-hover-secondary',
          'disabled:bg-transparent disabled:text-functional-disable-text',
        ],
        warning: [
          'border border-status-negative bg-transparent text-status-negative',
          'hover:bg-status-negative hover:text-grey-0',
          'disabled:border-red-100 disabled:bg-transparent disabled:text-red-100',
        ],
      },
      size: {
        sm: 'secondary-body3 h-[26px] px-3 py-[5px]',
        md: 'secondary-body2 h-[34px] px-4 py-2',
        lg: 'secondary-body2 h-[42px] px-5 py-3',
      },
      usage: {} as Record<NonNullable<CosButtonUsage>, ClassValue>,
    },
    compoundVariants: [
      { usage: 'icon-only', size: 'sm', className: 'p-[5px]' },
      { usage: 'icon-only', size: 'md', className: 'p-2' },
      { usage: 'icon-only', size: 'lg', className: 'p-3' },
    ],
  },
)

const iconContainer = cva('flex items-center justify-center', {
  variants: {
    size: {
      sm: 'size-[16px]',
      md: 'size-[18px]',
      lg: 'size-[18px]',
    },
  },
})

const loadingSpinner = cva(undefined, {
  variants: {
    type: {
      primary: 'text-functional-disable-text',
      secondary: 'text-functional-disable-text',
      ghost: 'text-functional-disable-text',
      warning: 'text-red-100',
    },
  },
})

type ButtonLoadingSpinnerProps = {
  type: CosButtonType
}

const ButtonLoadingSpinner = (props: ButtonLoadingSpinnerProps) => {
  const { type } = props
  return (
    <CosLoadingSpinner variant="dot45" className={loadingSpinner({ type })} />
  )
}

const getIconSizeByButtonSize = (size: CosButtonSize) => {
  const sizeMapping: Record<CosButtonSize, IconSize> = {
    sm: 'md-sm',
    md: 'md',
    lg: 'md',
  }
  const iconSize = sizeMapping[size]

  return getIconSizeClass(iconSize)
}

export const CosButton = (props: CosButtonProps) => {
  const {
    type = 'primary',
    size = 'md',
    usage = 'text-only',
    loading = false,
    disabled: disabledProp = false,
    onClick,
    className,
  } = props

  const disabled = disabledProp || loading

  const renderIcon = (Icon: SvgComponent) => {
    return (
      <div className={twMerge(iconContainer({ size }))}>
        {loading ? (
          <ButtonLoadingSpinner type={type} />
        ) : (
          <Icon className={getIconSizeByButtonSize(size)} />
        )}
      </div>
    )
  }

  const renderButtonContent = () => {
    switch (props.usage) {
      case 'icon-only':
        return renderIcon(props.Icon)
      case 'icon-left':
        return (
          <>
            {renderIcon(props.Icon)}
            {props.children}
          </>
        )
      case 'icon-right':
        return (
          <>
            {props.children}
            {renderIcon(props.Icon)}
          </>
        )
      case 'text-only':
      default:
        return (
          <>
            {props.children}
            {loading && <ButtonLoadingSpinner type={type} />}
          </>
        )
    }
  }

  return (
    <button
      className={twMerge(button({ type, size, usage }), className)}
      disabled={disabled}
      onClick={onClick}
    >
      {renderButtonContent()}
    </button>
  )
}
