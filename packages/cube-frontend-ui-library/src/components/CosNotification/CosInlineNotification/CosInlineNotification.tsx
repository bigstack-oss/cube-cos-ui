import { PropsWithChildren, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import { PropsWithClassName } from '@cube-frontend/utils'
import CircleFill from '../../../components/CosIcon/monochrome/circle_fill.svg?react'
import WarningFilled from '../../../components/CosIcon/monochrome/warning_filled.svg?react'
import WarningAltFilled from '../../../components/CosIcon/monochrome/warning_alt_filled.svg?react'
import CloseIcon from '../../../components/CosIcon/monochrome/x_small.svg?react'
import { CosHyperlink } from '../../CosHyperlink/CosHyperlink'
import { CosInlineNotificationSkeleton } from './CosInlineNotificationSkeleton'

export type CosInlineNotificationType =
  | 'neutral'
  | 'positive'
  | 'warning'
  | 'error'

const notificationStyles = cva(
  [
    'flex min-h-[44px] w-full gap-3 rounded-[5px] border px-4 py-[14px]',
    'primary-body4 text-functional-text-light',
  ],
  {
    variants: {
      type: {
        neutral: 'border-primary bg-primary-0',
        positive: 'border-status-positive bg-green-0',
        warning: 'border-status-warning bg-yellow-0',
        error: 'border-status-negative bg-red-0',
      },
      isClose: {
        true: 'hidden',
      },
    },
    defaultVariants: {
      type: 'neutral',
      isClose: false,
    },
  },
)

type CosInlineNotificationProps = PropsWithChildren<
  PropsWithClassName & {
    isLoading?: boolean
    /**
     * @default 'neutral'
     */
    type?: CosInlineNotificationType
    title?: string
    link?: {
      href: string
      text: string
    }
    onClose?: () => void
    skeletonClassName?: string
  }
>

export const CosInlineNotification = (props: CosInlineNotificationProps) => {
  const {
    type = 'neutral',
    title,
    children,
    link,
    onClose: onCloseProp,
    isLoading,
    className: classNameProp,
    skeletonClassName,
  } = props

  const [close, setClose] = useState(false)

  const handleClose = () => {
    onCloseProp?.()
    setClose(true)
  }

  const renderIcon = () => {
    switch (type) {
      case 'positive':
        return <CircleFill className="icon-md shrink-0 text-status-positive" />
      case 'warning':
        return (
          <WarningAltFilled className="icon-md shrink-0 text-status-warning" />
        )
      case 'error':
        return (
          <WarningFilled className="icon-md shrink-0 text-status-negative" />
        )
      default:
        return null
    }
  }

  const renderTitle = () => {
    if (!title) {
      return null
    }
    return <div className="font-semibold text-functional-title">{title}</div>
  }

  const renderLink = () => {
    if (!link) {
      return null
    }
    return (
      <CosHyperlink size="sm" variant="text-inline" href={link.href}>
        {link.text}
      </CosHyperlink>
    )
  }

  const renderCloseButton = () => {
    return (
      <CloseIcon
        className="icon-md shrink-0 cursor-pointer text-functional-text hover:text-functional-text-light"
        onClick={handleClose}
      />
    )
  }

  if (isLoading)
    return (
      <CosInlineNotificationSkeleton
        hasIcon={type !== 'neutral'}
        hasTitle={!!title}
        hasSubtitle={!!children}
        hasLink={!!link}
        className={skeletonClassName}
      />
    )

  return (
    <div
      className={twMerge(
        notificationStyles({ type, isClose: close }),
        classNameProp,
      )}
    >
      <div className="flex flex-1 items-start gap-2">
        {renderIcon()}
        {renderTitle()}
        {children}
      </div>
      <div className="flex items-center gap-2 self-start">
        {renderLink()}
        {renderCloseButton()}
      </div>
    </div>
  )
}
