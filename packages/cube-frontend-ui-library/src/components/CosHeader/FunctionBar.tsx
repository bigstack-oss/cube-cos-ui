import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'
import { CosButton } from '../CosButton/CosButton'
import { cloneElement, PropsWithChildren, ReactElement } from 'react'
import { PropsWithClassName } from '@cube-frontend/utils'

export type FunctionBarProps = {
  notificationContainer?: ReactElement<PropsWithClassName & PropsWithChildren>
  onLogout: () => void
}

export const FunctionBar = (props: FunctionBarProps) => {
  const { notificationContainer, onLogout } = props

  const renderNotification = () => {
    const button = (
      <CosButton
        size="md"
        type="ghost"
        usage="icon-only"
        Icon={NotificationIcon}
      />
    )

    if (!notificationContainer) {
      return button
    }

    return cloneElement(notificationContainer, {
      children: button,
    })
  }

  return (
    <div className="flex flex-row items-center">
      {renderNotification()}
      <CosButton
        size="md"
        type="ghost"
        usage="icon-only"
        Icon={LogoutIcon}
        onClick={() => onLogout()}
      />
    </div>
  )
}
