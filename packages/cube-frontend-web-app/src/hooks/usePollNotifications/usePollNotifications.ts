import {
  GetDataCentersResponseDataInner,
  Notification,
} from '@cube-frontend/api'
import { CosNotificationType, useToast } from '@cube-frontend/ui-library'
import { UserContext } from '@cube-frontend/web-app/context/UserContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import dayjs from 'dayjs'
import { noop, uniqueId } from 'lodash'
import { createElement, useContext } from 'react'
import { Link } from 'react-router'
import { notificationsApi } from '../../api/cosApi'
import { DataCenterContext } from '../../context/DataCenterContext'
import { useSequentialInterval } from '../useSequentialInterval/useSequentialInterval'
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
    dataCenter: GetDataCentersResponseDataInner,
  ): Promise<Notification[]> => {
    const start = computeStartFrom(username, dataCenter)
    try {
      const {
        data: { data: notifications },
      } = await notificationsApi.getNotifications({
        dataCenter: dataCenter.name,
        start,
      })
      return notifications
    } catch (error) {
      console.error('Get notifications error: ', error)
      throw error
    }
  }

  const showNotification = (notification: Notification): void => {
    const notificationId = notification.id
    const type: CosNotificationType = notificationId.endsWith('E')
      ? 'error'
      : 'positive'
    addToast({
      id: createId(),
      type,
      title: mockI18n(`notifications.${notificationId}.title`),
      message: mockI18n(
        `notifications.${notificationId}.message`,
        getI18nArgs(notification),
      ),
      link: {
        Container: createElement(Link, {
          to: CosRoutesEnum.NODE_DETAIL_PAGE(notification.nodeName),
        }),
        text: 'Check',
        onClick: noop,
      },
      time: dayjs.respectTzOffset(notification.time).format('HH:mm:ss A'),
    })
  }

  useSequentialInterval(pollAndShow, 3000)
}

const getI18nArgs = (notification: Notification): Record<string, unknown> => {
  const { nodeName, additionalInfo } = notification

  const args: Record<string, unknown> = { node: nodeName }

  if ('device' in additionalInfo) {
    args.device = additionalInfo.device
  }

  if ('osdId' in additionalInfo) {
    args.osd = additionalInfo.osdId
  }

  return args
}
