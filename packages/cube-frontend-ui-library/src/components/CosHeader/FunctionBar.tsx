import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'

import { FunctionIconButton } from './FunctionIconButton'

export type FunctionBarProps = {
  onLogout: () => void
}

export const FunctionBar = (props: FunctionBarProps) => {
  const { onLogout } = props

  const functionButtons = [
    {
      icon: NotificationIcon,
      onClick: () => {
        // TODO: implement notification logic here.
      },
    },
    {
      icon: LogoutIcon,
      onClick: () => onLogout(),
    },
  ]
  return (
    <div className="flex flex-row items-center gap-x-2.5 text-primary">
      {functionButtons.map((button, index) => (
        <FunctionIconButton
          key={index}
          onClick={button.onClick}
          Icon={button.icon}
        />
      ))}
    </div>
  )
}
