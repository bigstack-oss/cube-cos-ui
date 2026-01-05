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
  t: TFunction,
): NotificationToastArgs => {
  const { id, time } = notification

  const type: CosNotificationType = notification.id.endsWith('E')
    ? 'error'
    : 'positive'

  const getLinkFn =
    notificationLinkFnMap[notification.id] ??
    // Fallback to node detail link in case a new notification ID is added without updating the OpenAPI docs.
    nodeDetailLinkFn

  return {
    type,
    titleI18nKey: `notifications.${id}.title`,
    messageI18nKey: `notifications.${id}.message`,
    messageI18nArgs: getI18nArgs(notification),
    linkProps: {
      className: 'inline-flex',
      Container: createElement(Link, {
        to: getLinkFn(notification),
      }),
      text: t('notifications.check'),
      onClick: noop,
    },
    time: dayjs.respectTzOffset(time).format('HH:mm:ss A'),
  }
}

const getI18nArgs = (notification: Notification): Record<string, unknown> => {
  const { nodeName, additionalInfo } = notification

  const args: Record<string, unknown> = { ...additionalInfo, node: nodeName }

  if ('device' in additionalInfo) {
    args.device = additionalInfo.device
  }

  if ('osdId' in additionalInfo) {
    args.osd = additionalInfo.osdId
  }

  return args
}

const nodeDetailLinkFn = (notification: Notification): string => {
  return CosRoutesEnum.NODE_DETAIL_PAGE(notification.nodeName)
}

const notificationLinkFnMap: Record<
  Notification['id'],
  (notification: Notification) => string
> = {
  // Device
  DEV00001E: nodeDetailLinkFn,
  DEV00001I: nodeDetailLinkFn,
  DEV00002E: nodeDetailLinkFn,
  DEV00002I: nodeDetailLinkFn,
  DEV00003E: nodeDetailLinkFn,
  DEV00003I: nodeDetailLinkFn,
  DEV00004E: nodeDetailLinkFn,
  DEV00004I: nodeDetailLinkFn,
  // OSD
  OSD00001E: nodeDetailLinkFn,
  OSD00001I: nodeDetailLinkFn,
  OSD00002E: nodeDetailLinkFn,
  OSD00002I: nodeDetailLinkFn,
  OSD00003E: nodeDetailLinkFn,
  OSD00003I: nodeDetailLinkFn,
  // Model
  MDL00001E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  MDL00001I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  MDL00002E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  MDL00002I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  MDL00003E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  MDL00003I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE,
  // Storage
  STG00001E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00001I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00002E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00002I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00003E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00003I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00004E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00004I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00005E: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
  STG00005I: () => CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
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
