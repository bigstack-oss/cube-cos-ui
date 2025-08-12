import { Notification } from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosPagination,
  CosSearchBarGlobal,
  GetCosViewDetailsTable,
  renderCosNotificationLink,
  useExpandedRowIdSet,
} from '@cube-frontend/ui-library'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { timeRanges } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'
import { mockI18n } from '@cube-frontend/web-app/hooks/usePollNotifications/mockI18n'
import { notificationToToastArgs } from '@cube-frontend/web-app/utils/notification'
import dayjs from 'dayjs'
import { useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  NotificationRow,
  notificationToTableRow,
} from './notificationsPageUtils'
import { useListNotificationsQuery } from './useListNotificationsQuery'
import { usePagedNotifications } from './usePagedNotifications'

const NotificationsTable = GetCosViewDetailsTable<NotificationRow>()

export const NotificationsPage = () => {
  const {
    query,
    debouncedKeyword,
    onTimeRangeChange,
    onKeywordChange,
    onKeywordClear,
    onPageChange,
    onItemsPerPageChange,
  } = useListNotificationsQuery()

  const { isLoading, pagedNotifications } = usePagedNotifications(
    query,
    debouncedKeyword,
  )

  const rows = useMemo<NotificationRow[]>(
    () => (pagedNotifications?.notifications ?? []).map(notificationToTableRow),
    [pagedNotifications?.notifications],
  )

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const computeDetailTitle = (row: NotificationRow): string => {
    let description: string = ''

    if ('description' in row.additionalInfo) {
      description = row.additionalInfo.description ?? ''
    }

    description ||= 'No details'

    return description
  }

  const renderMessage = (row: NotificationRow) => {
    const { messageI18nKey, messageI18nArgs, linkProps } =
      notificationToToastArgs({
        ...row,
        id: row.eventId,
      } as Notification)

    return (
      <div className="text-wrap">
        {mockI18n(messageI18nKey, messageI18nArgs)}
        {!!linkProps &&
          renderCosNotificationLink({
            ...linkProps,
            className: twMerge(linkProps.className, 'ml-2'),
          })}
      </div>
    )
  }

  return (
    <CosGeneralPanel
      topic="Notifications"
      icon={
        <CosSearchBarGlobal
          variant="regular"
          placeholder="Search"
          value={query.keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          onInputClear={onKeywordClear}
        />
      }
      dropdown={
        <TimeRangeDropdown
          timeRanges={timeRanges}
          selectedItem={query.timeRange}
          onChange={onTimeRangeChange}
        />
      }
    >
      <div className="flex flex-col gap-y-4">
        <NotificationsTable
          isLoading={isLoading}
          rows={rows}
          expandedRowIdSet={expandedRowIdSet}
          onExpandChange={onExpandChange}
          getDetailItems={() => []}
          detailTitle={computeDetailTitle}
        >
          <NotificationsTable.Column
            label="Timestamp"
            property="time"
            fitContent={true}
          >
            {(time) => (
              <span className="whitespace-nowrap">
                {dayjs.respectTzOffset(time).format('YYYY/MM/DD HH:mm:ss')}
              </span>
            )}
          </NotificationsTable.Column>
          <NotificationsTable.Column
            label="Type"
            property="eventId"
            fitContent={true}
          >
            {(eventId) => (
              <span className="whitespace-nowrap">
                {eventId.endsWith('E') ? 'Error / Failure' : 'Success'}
              </span>
            )}
          </NotificationsTable.Column>
          <NotificationsTable.Column label="Message" property="additionalInfo">
            {(_, row) => renderMessage(row)}
          </NotificationsTable.Column>
        </NotificationsTable>
        <CosPagination
          isLoading={isLoading}
          totalItems={pagedNotifications?.page.totalItemCount ?? 0}
          currentPage={query.currentPage}
          itemsPerPage={query.itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
      </div>
    </CosGeneralPanel>
  )
}
