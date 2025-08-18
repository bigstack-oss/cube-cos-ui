import { NotificationsApiGetLastNotificationRequest } from '@cube-frontend/api'
import { notificationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { NotificationsContext } from '@cube-frontend/web-app/context/NotificationsContext'
import {
  checkIsNotificationUnread,
  checkIsNotificationWithin,
  ListNotificationsPastEnum,
} from '@cube-frontend/web-app/utils/notification'
import { useContext } from 'react'
import { useCosGetRequest } from '../useCosRequest/useCosGetRequest'
import { usePolling } from '../usePolling'

const CHECK_INTERVAL = 3 * 1000

export const useHasUnreadNotifications = (): boolean => {
  const { dataCenter } = useContext(DataCenterContext)
  const { lastAccessedAt } = useContext(NotificationsContext)

  const { data: lastNotification, getResource: getLastNotification } =
    useCosGetRequest(
      notificationsApi.getLastNotification,
      (): NotificationsApiGetLastNotificationRequest => ({
        dataCenter: dataCenter!.name,
      }),
    )

  usePolling(getLastNotification, CHECK_INTERVAL)

  const lastNotificationTime = lastNotification?.time

  return (
    !!lastNotificationTime &&
    /**
     * The widest time range in the dropdown is 30 days, so notifications older
     * than this should not appear in the table, and the unread indicator in the
     * function bar should should also be hidden if the last notification was
     * created more than 30 days ago.
     */
    checkIsNotificationWithin(
      lastNotificationTime,
      ListNotificationsPastEnum['30d'],
    ) &&
    checkIsNotificationUnread(lastNotificationTime, lastAccessedAt)
  )
}
