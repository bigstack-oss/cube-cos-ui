import { omit } from 'lodash'
import { ButtonHTMLAttributes, JSX } from 'react'
import { twMerge } from 'tailwind-merge'
import { IconSize, SvgComponent } from '../CosIcon/CosIcon'
import { getIconSizeClass } from '../CosIcon/utils'
import { CosLoadingSpinner } from '../CosLoadingSpinner/CosLoadingSpinner'
import { button, iconContainer, loadingSpinner } from './cosButtonStyles'

export type CosButtonType =
  | 'primary'
  | 'secondary'
  | 'ghost'
  | 'warning'
  | 'light'

export type CosButtonSize = 'sm' | 'md' | 'lg'

export type CosButtonProps = Omit<
  JSX.IntrinsicElements['button'],
  'type' | 'children'
> & {
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>['type']
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

type ButtonLoadingSpinnerProps = {
  type: CosButtonType
  usage: CosButtonUsage
}

const ButtonLoadingSpinner = (props: ButtonLoadingSpinnerProps) => {
  const { type, usage } = props
  return (
    <CosLoadingSpinner
      variant="dot45"
      className={loadingSpinner({ type, usage })}
    />
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
    htmlType = 'button',
    type = 'primary',
    size = 'md',
    usage = 'text-only',
    loading = false,
    disabled: disabledProp = false,
    onClick,
    className,
    ...restProps
  } = props

  const disabled = disabledProp || loading

  const renderIcon = (Icon: SvgComponent) => {
    return (
      <div className={twMerge(iconContainer({ size }))}>
        {loading ? (
          <ButtonLoadingSpinner type={type} usage={usage} />
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
            {loading && <ButtonLoadingSpinner type={type} usage={usage} />}
          </>
        )
    }
  }

  return (
    <button
      type={htmlType}
      className={twMerge(
        button({ type, size, usage, loading, disabled }),
        className,
      )}
      disabled={disabled}
      onClick={onClick}
      {...omit(restProps, 'Icon')}
    >
      {renderButtonContent()}
    </button>
  )
}
