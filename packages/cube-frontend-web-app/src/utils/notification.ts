import { Notification } from '@cube-frontend/api'
import { CosNotificationType, CosToastType } from '@cube-frontend/ui-library'
import dayjs from 'dayjs'
import { noop } from 'lodash'
import { createElement } from 'react'
import { Link } from 'react-router'
import { CosRoutesEnum } from '../enum/routes'

type NotificationToastArgs = {
  type: CosNotificationType
  titleI18nKey: string
  messageI18nKey: string
  messageI18nArgs: Record<string, unknown>
  linkProps: CosToastType['link']
  time: string
}

export const notificationToToastArgs = (
  notification: Notification,
): NotificationToastArgs => {
  const { id, nodeName, time } = notification

  const type: CosNotificationType = notification.id.endsWith('E')
    ? 'error'
    : 'positive'

  return {
    type,
    titleI18nKey: `notifications.${id}.title`,
    messageI18nKey: `notifications.${id}.message`,
    messageI18nArgs: getI18nArgs(notification),
    linkProps: {
      className: 'inline-flex',
      Container: createElement(Link, {
        to: CosRoutesEnum.NODE_DETAIL_PAGE(nodeName),
      }),
      text: 'Check',
      onClick: noop,
    },
    time: dayjs.respectTzOffset(time).format('HH:mm:ss A'),
  }
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

export const checkIsNotificationUnread = (
  notificationCreatedAt: string,
  lastAccessedAt: number,
): boolean => {
  const createdAt = dayjs.respectTzOffset(notificationCreatedAt)
  return createdAt.isSame(lastAccessedAt) || createdAt.isAfter(lastAccessedAt)
}
