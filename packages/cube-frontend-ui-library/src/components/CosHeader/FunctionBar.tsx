import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'
import { CosButton } from '../CosButton/CosButton'

export type FunctionBarProps = {
  onLogout: () => void
}

export const FunctionBar = (props: FunctionBarProps) => {
  const { onLogout } = props

  const functions = [
    {
      // TODO: implement unread notification dotspan.
      Icon: NotificationIcon,
      onClick: () => {
        // TODO: implement notification logic here.
      },
    },
    {
      Icon: LogoutIcon,
      onClick: () => onLogout(),
    },
  ]
  return (
    <div className="flex flex-row items-center">
      {functions.map((button, index) => (
        <CosButton
          key={index}
          size="md"
          type="ghost"
          usage="icon-only"
          Icon={button.Icon}
        />
      ))}
    </div>
  )
}
