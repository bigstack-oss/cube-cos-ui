import { Notification } from '@cube-frontend/api'
import { CosNotificationType, CosToastType } from '@cube-frontend/ui-library'
import dayjs from 'dayjs'
import { noop } from 'lodash'
import { createElement } from 'react'
import { Link } from 'react-router'
import { CosRoutesEnum } from '../enum/routes'
import { TFunction } from 'i18next'

type NotificationToastArgs = {
  type: CosNotificationType
  titleI18nKey: `notifications.${Notification['id']}.title`
  messageI18nKey: `notifications.${Notification['id']}.message`
  messageI18nArgs: Record<string, unknown>
  linkProps: CosToastType['link']
  time: string
}

export const notificationToToastArgs = (
  notification: Notification,
  t: TFunction<'translation', undefined>,
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
      text: t('notifications.check'),
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

export enum ListNotificationsPastEnum {
  '1h' = '1h',
  '24h' = '24h',
  '7d' = '7d',
  '14d' = '14d',
  '30d' = '30d',
}

export const checkIsNotificationWithin = (
  createdAt: string,
  pastEnum: ListNotificationsPastEnum,
): boolean => {
  // E.g., ['30d', '30', 'd']
  const [, value, unit] = /(^\d+)(\w$)/.exec(pastEnum) ?? []
  if (!value || !unit) throw new Error(`Malformed past enum: ${pastEnum}`)

  const pastValue = parseInt(value, 10)
  const pastUnit = unit as dayjs.ManipulateType

  const createdDate = dayjs.respectTzOffset(createdAt)
  const minDate = dayjs().subtract(pastValue, pastUnit)

  return createdDate.isSame(minDate) || createdDate.isAfter(minDate)
}
