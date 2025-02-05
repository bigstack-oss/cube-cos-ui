import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'
import { FunctionalIconButton } from './FunctionalIconButton'
import { logoutApi } from '@cube-frontend/web-app/utils/cosApi'

const FunctionalBlock = () => {
  const platformButtons = [
    {
      icon: <NotificationIcon />,
      onClick: () => {
        // TODO: implement notification logic here.
      },
    },
    {
      icon: <LogoutIcon />,
      onClick: () => logoutApi.logout(),
    },
  ]
  return (
    <div className="flex flex-row items-center gap-x-2.5 text-primary">
      {platformButtons.map((button, index) => (
        <FunctionalIconButton key={index} onClick={button.onClick}>
          {button.icon}
        </FunctionalIconButton>
      ))}
    </div>
  )
}

export default FunctionalBlock
