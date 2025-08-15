import { DataCenter, Notification } from '@cube-frontend/api'
import { MAX_VISIBLE_TOASTS_AMOUNT, useToast } from '@cube-frontend/ui-library'
import { UserContext } from '@cube-frontend/web-app/context/UserContext'
import { notificationToToastArgs } from '@cube-frontend/web-app/utils/notification'
import { uniqueId } from 'lodash'
import { useContext } from 'react'
import { notificationsApi } from '../../api/cosApi'
import { DataCenterContext } from '../../context/DataCenterContext'
import { usePolling } from '../usePolling'
import { mockI18n } from './mockI18n'
import {
  computeLastNotificationTimeLocalStorageKey,
  computeStartFrom,
} from './pollNotificationUtils'

const createId = (): string => {
  return uniqueId('cos-notification')
}

export const usePollNotifications = (): void => {
  const { userInfo } = useContext(UserContext)
  const { dataCenter } = useContext(DataCenterContext)

  const { addToast } = useToast()

  const pollAndShow = async (): Promise<void> => {
    const username = userInfo?.name
    if (!username || !dataCenter) return

    const notifications = await getNotifications(username, dataCenter)
    notifications.forEach(showNotification)

    const lastNotification: Notification | undefined =
      notifications[notifications.length - 1]

    if (lastNotification) {
      const key = computeLastNotificationTimeLocalStorageKey(
        username,
        dataCenter.name,
      )
      localStorage.setItem(key, lastNotification.time)
    }
  }

  const getNotifications = async (
    username: string,
    dataCenter: DataCenter,
  ): Promise<Notification[]> => {
    const start = computeStartFrom(username, dataCenter)
    try {
      const {
        data: { data: pagedNotifications },
      } = await notificationsApi.getNotifications({
        dataCenter: dataCenter.name,
        start,
        pageNum: 1,
        pageSize: MAX_VISIBLE_TOASTS_AMOUNT,
      })
      return pagedNotifications.notifications
    } catch (error) {
      console.error('Get notifications error: ', error)
      throw error
    }
  }

  const showNotification = (notification: Notification): void => {
    const {
      type,
      titleI18nKey,
      messageI18nArgs,
      messageI18nKey,
      linkProps,
      time,
    } = notificationToToastArgs(notification)

    addToast({
      id: createId(),
      type,
      title: mockI18n(titleI18nKey),
      message: mockI18n(messageI18nKey, messageI18nArgs),
      link: linkProps,
      time,
    })
  }

  usePolling(pollAndShow, 3000, { immediate: true })
}
