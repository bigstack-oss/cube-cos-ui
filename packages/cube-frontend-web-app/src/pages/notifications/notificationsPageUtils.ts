import { Notification } from '@cube-frontend/api'
import { CosTableRow, DEFAULT_ITEMS_PER_PAGE } from '@cube-frontend/ui-library'
import { paginationQuerySchema } from '@cube-frontend/web-app/utils/pagination'
import { z } from 'zod'

enum ParamKeyEnum {
  TimeRange = 'past',
  Keyword = 'keyword',
  CurrentPage = 'page',
  ItemsPerPage = 'pageSize',
}

export enum ListNotificationsPastEnum {
  '1h' = '1h',
  '24h' = '24h',
  '7d' = '7d',
  '14d' = '14d',
  '30d' = '30d',
}

const DEFAULT_TIME_RANGE = ListNotificationsPastEnum['24h']

export const listNotificationsPastEnums = Object.values(
  ListNotificationsPastEnum,
)

const schema = paginationQuerySchema.extend({
  timeRange: z
    .string()
    .optional()
    .transform((value: string | undefined): ListNotificationsPastEnum => {
      if (!value || !(value in ListNotificationsPastEnum)) {
        return DEFAULT_TIME_RANGE
      }
      return value as ListNotificationsPastEnum
    }),
  keyword: z.string(),
})

export type ListNotificationsQuery = z.output<typeof schema>

export const queryToSearchParams = (
  query: ListNotificationsQuery,
): URLSearchParams => {
  const { timeRange, keyword, currentPage, itemsPerPage } = query
  const nextSearchParams = new URLSearchParams()

  if (timeRange) {
    nextSearchParams.set(ParamKeyEnum.TimeRange, timeRange)
  }

  if (keyword) {
    nextSearchParams.set(ParamKeyEnum.Keyword, keyword)
  }

  if (currentPage) {
    nextSearchParams.set(ParamKeyEnum.CurrentPage, currentPage.toString())
  }

  if (itemsPerPage) {
    nextSearchParams.set(ParamKeyEnum.ItemsPerPage, itemsPerPage.toString())
  }

  return nextSearchParams
}

export const searchParamsToQuery = (
  searchParams: URLSearchParams,
): ListNotificationsQuery => {
  const timeRange = searchParams.get(ParamKeyEnum.TimeRange)
  const keyword = searchParams.get(ParamKeyEnum.Keyword)
  const currentPage = searchParams.get(ParamKeyEnum.CurrentPage)
  const itemsPerPage = searchParams.get(ParamKeyEnum.ItemsPerPage)

  const parsedQuery = schema.safeParse({
    timeRange,
    keyword,
    currentPage,
    itemsPerPage,
  }).data

  return {
    timeRange: parsedQuery?.timeRange ?? DEFAULT_TIME_RANGE,
    keyword: parsedQuery?.keyword ?? '',
    currentPage: parsedQuery?.currentPage ?? 1,
    itemsPerPage: parsedQuery?.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
  }
}

const computeTableRowId = (notification: Notification): string => {
  const { nodeName, id, time } = notification
  return [nodeName, id, time].join('-')
}

export type NotificationRow = CosTableRow &
  // Omit the original `id` from notifications because they're not unique.
  Omit<Notification, 'id'> & {
    eventId: Notification['id']
  }

export const notificationToTableRow = (
  notification: Notification,
): NotificationRow => {
  return {
    ...notification,
    eventId: notification.id,
    id: computeTableRowId(notification),
  }
}
