import { FunctionBarItem } from '@cube-frontend/ui-library'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'
import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import { Link, LinkProps } from 'react-router'
import { logoutApi } from '../api/cosApi'
import { CosRoutesEnum } from '../enum/routes'

export const useFunctionBarItems = (): FunctionBarItem[] => {
  const notification: FunctionBarItem<LinkProps> = {
    Icon: NotificationIcon,
    // TODO: i18n.
    hoverMessage: 'Events',
    container: {
      Component: Link,
      props: {
        to: CosRoutesEnum.EVENTS_PAGE,
      },
    },
  }

  const logout: FunctionBarItem = {
    Icon: LogoutIcon,
    // TODO: i18n.
    hoverMessage: 'Logout',
    onClick: () => {
      logoutApi.logout()
    },
  }

  // TODO: Fix type issue to get rid of the `as` casting here.
  return [notification, logout] as FunctionBarItem[]
}
