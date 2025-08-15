import { FunctionBarItem } from '@cube-frontend/ui-library'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'
import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import NotificationClippedIcon from '@cube-frontend/ui-library/icons/monochrome/notification_clipped.svg?react'
import { Link, LinkProps } from 'react-router'
import { logoutApi } from '../api/cosApi'
import { UnreadNotificationDot } from '../components/UnreadNotificationDot'
import { CosRoutesEnum } from '../enum/routes'
import { useHasUnreadNotifications } from '../hooks/usePollNotifications/useHasUnreadNotifications'

export const useFunctionBarItems = (): FunctionBarItem[] => {
  const hasUnreadNotifications = useHasUnreadNotifications()

  const notification: FunctionBarItem<LinkProps> = {
    Icon: hasUnreadNotifications ? NotificationClippedIcon : NotificationIcon,
    // TODO: i18n.
    hoverMessage: 'Notifications',
    container: {
      Component: Link,
      props: {
        className: 'relative',
        to: CosRoutesEnum.NOTIFICATIONS_PAGE,
      },
    },
    additionalElements: [
      hasUnreadNotifications && (
        <UnreadNotificationDot className="absolute right-[10px] top-[11px]" />
      ),
    ],
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
