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
import { UnreadNotificationDot } from '@cube-frontend/web-app/components/UnreadNotificationDot'
import { NotificationsContext } from '@cube-frontend/web-app/context/NotificationsContext'
import {
  checkIsNotificationUnread,
  ListNotificationsPastEnum,
  notificationToToastArgs,
} from '@cube-frontend/web-app/utils/notification'
import dayjs from 'dayjs'
import { useContext, useMemo } from 'react'
import { twMerge } from 'tailwind-merge'
import {
  NotificationRow,
  notificationToTableRow,
} from './notificationsPageUtils'
import { useListNotificationsQuery } from './useListNotificationsQuery'
import { usePagedNotifications } from './usePagedNotifications'
import { useUpdateLastAccessedAt } from './useUpdateLastAccessedAt'
import { Trans, useTranslation } from 'react-i18next'

const NotificationsTable = GetCosViewDetailsTable<NotificationRow>()

const pastEnums = Object.values(ListNotificationsPastEnum)

export const NotificationsPage = () => {
  const { t } = useTranslation()

  const {
    query,
    debouncedKeyword,
    onTimeRangeChange,
    onKeywordChange,
    onKeywordClear,
    onPageChange,
    onItemsPerPageChange,
  } = useListNotificationsQuery()

  const { isFetching, showLoading, pagedNotifications } = usePagedNotifications(
    query,
    debouncedKeyword,
  )

  const rows = useMemo<NotificationRow[]>(
    () => (pagedNotifications?.notifications ?? []).map(notificationToTableRow),
    [pagedNotifications?.notifications],
  )

  const { expandedRowIdSet, onExpandChange } = useExpandedRowIdSet()

  const { lastAccessedAt } = useContext(NotificationsContext)

  useUpdateLastAccessedAt(isFetching)

  const hasUnreadRows = useMemo<boolean>(
    () =>
      rows.some((row) => checkIsNotificationUnread(row.time, lastAccessedAt)),
    [rows, lastAccessedAt],
  )

  const computeDetailTitle = (row: NotificationRow): string => {
    let description: string = t('notifications.noDetails')

    if ('additionalInfo' in row && 'description' in row.additionalInfo) {
      description = row.additionalInfo.description ?? ''
    }

    return description
  }

  const renderUnreadDot = (row: NotificationRow) => {
    // Render nothing when all rows are read to prevent showing an empty, fixed-size span on every row.
    if (!hasUnreadRows) return null

    const isCreatedAfterLastAccessed = dayjs
      .respectTzOffset(row.time)
      .isAfter(lastAccessedAt)

    return (
      <span className="inline-flex size-4 items-center justify-center">
        {isCreatedAfterLastAccessed && <UnreadNotificationDot />}
      </span>
    )
  }

  const renderMessage = (row: NotificationRow) => {
    const { messageI18nKey, messageI18nArgs, linkProps } =
      notificationToToastArgs(
        {
          ...row,
          id: row.eventId,
        } as Notification,
        t,
      )

    return (
      <div className="text-wrap">
        <Trans
          i18nKey={messageI18nKey}
          values={messageI18nArgs}
          components={{ bold: <strong /> }}
        />
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
      topic={t('notifications.title')}
      rightSlot={
        <>
          <CosSearchBarGlobal
            variant="regular"
            placeholder={t('notifications.searchBar.placeholder')}
            value={query.keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onInputClear={onKeywordClear}
          />
          <TimeRangeDropdown
            timeRanges={pastEnums}
            selectedItem={query.timeRange}
            onChange={onTimeRangeChange}
          />
        </>
      }
    >
      <div className="flex flex-col gap-y-4">
        <NotificationsTable
          isLoading={showLoading}
          rows={rows}
          expandedRowIdSet={expandedRowIdSet}
          onExpandChange={onExpandChange}
          getDetailItems={() => []}
          detailTitle={computeDetailTitle}
          beforeExpandButton={renderUnreadDot}
        >
          <NotificationsTable.Column
            label={t('notifications.timestamp')}
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
            label={t('notifications.type')}
            property="eventId"
            fitContent={true}
          >
            {(eventId) => (
              <span className="whitespace-nowrap">
                {eventId.endsWith('E')
                  ? t('notifications.type.error')
                  : t('notifications.type.success')}
              </span>
            )}
          </NotificationsTable.Column>
          <NotificationsTable.Column
            label={t('notifications.message')}
            property="additionalInfo"
          >
            {(_, row) => renderMessage(row)}
          </NotificationsTable.Column>
        </NotificationsTable>
        <CosPagination
          isLoading={showLoading}
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
