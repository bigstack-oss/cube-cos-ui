import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { twMerge } from 'tailwind-merge'
import { SvgComponent } from '../CosIcon/CosIcon'
import { createBlueStyles } from './blueStyles'
import { createCyanStyles } from './cyanStyles'
import { createDarkStyles } from './darkStyles'
import { createDefaultStyles } from './defaultStyles'
import { createPrimaryBlueStyles } from './primaryBlueStyles'
import { Compound } from './styleUtils'

export type CosTagProps = {
  children: string
  color?: CosTagColor
  variant: CosTagVariant
  disabled?: boolean
} & (
  | // The props for the close button and icon are both optional.
  // To allow this, we need to add an empty object to the union type.
  // `NonNullable<unknown>` is used to avoid `{}`.
  NonNullable<unknown>
  | {
      showCloseButton: boolean
      onClose?: () => void
    }
  | { Icon: SvgComponent }
)

export type CosTagColor = 'default' | 'primary-blue' | 'blue' | 'cyan' | 'dark'

export type CosTagVariant = 'filled' | 'stroke'

const tag = cva(
  [
    'inline-flex items-center gap-x-[5px] whitespace-nowrap',
    'h-[21px] w-fit cursor-default rounded-[20px] px-2.5 py-1',
    'secondary-body5 font-semibold',
  ],
  {
    variants: {
      // Use `as` for `compoundVariants` to infer the type.
      color: {} as Record<CosTagColor, ClassValue>,
      variant: {} as Record<CosTagVariant, ClassValue>,
      hasCloseButton: {
        true: undefined,
      },
      hasIcon: {
        true: undefined,
      },
      disabled: {
        true: undefined,
      },
    },
    compoundVariants: ([] as Compound[]).concat(
      createDefaultStyles(),
      createPrimaryBlueStyles(),
      createBlueStyles(),
      createCyanStyles(),
      createDarkStyles(),
    ),
  },
)

const closeButton = cva('icon-xs', {
  variants: {
    disabled: {
      false: 'cursor-pointer',
      true: 'cursor-default',
    },
  },
})

export const CosTag = (props: CosTagProps) => {
  const { children, color = 'default', variant, disabled = false } = props

  const hasIcon = 'Icon' in props
  const hasCloseButton = 'showCloseButton' in props && props.showCloseButton

  const renderIcon = () => {
    if (!hasIcon) {
      return undefined
    }

    const { Icon } = props
    return <Icon className="icon-xs" />
  }

  const renderCloseButton = () => {
    if (!hasCloseButton) {
      return undefined
    }

    const { onClose: onCloseProp } = props

    const onClose = () => {
      if (!disabled) {
        onCloseProp?.()
      }
    }

    return <X className={closeButton({ disabled })} onClick={onClose} />
  }

  return (
    <span
      className={twMerge(
        tag({
          color,
          variant,
          hasCloseButton,
          hasIcon,
          disabled,
        }),
      )}
    >
      {renderIcon()}
      {children}
      {renderCloseButton()}
    </span>
  )
}
