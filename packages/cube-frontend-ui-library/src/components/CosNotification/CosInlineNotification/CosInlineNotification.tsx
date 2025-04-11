import { PropsWithChildren, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import { cva } from 'class-variance-authority'
import { PropsWithClassName } from '@cube-frontend/utils'
import { CosInlineNotificationSkeleton } from './CosInlineNotificationSkeleton'
import { CosNotificationBaseProps } from '../cosNotificationTypes'
import {
  renderCloseButton,
  renderIcon,
  renderLink,
  renderTitle,
} from '../cosNotificationUtils'

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
  PropsWithClassName &
    CosNotificationBaseProps & {
      isLoading?: boolean
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
        {renderIcon(type)}
        {renderTitle(title)}
        {children}
      </div>
      <div className="flex items-center gap-2 self-start">
        {renderLink(link)}
        {renderCloseButton(handleClose)}
      </div>
    </div>
  )
}
