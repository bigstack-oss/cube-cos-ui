import { NotificationsApiGetLastNotificationRequest } from '@cube-frontend/api'
import { notificationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { NotificationsContext } from '@cube-frontend/web-app/context/NotificationsContext'
import { checkIsNotificationUnread } from '@cube-frontend/web-app/utils/notification'
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
    checkIsNotificationUnread(lastNotificationTime, lastAccessedAt)
  )
}
