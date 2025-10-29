import { useContext, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import { useTranslation } from 'react-i18next'
import {
  EventsApiGetEventsRequest,
  GetEventsResponseDataEventsInner,
  Node,
} from '@cube-frontend/api'
import {
  CosGeneralPanel,
  CosPagination,
  DEFAULT_ITEMS_PER_PAGE,
  GetCosBasicTable,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { NODE_DETAILS_POLLING_INTERVAL } from '../NodeDetailsPageUtils'
import { chartTimeRanges } from './nodeChartsUtils'

type NodeEventsProps = {
  node: Node | undefined
}

const EventTable = GetCosBasicTable<EventRow>()

type EventRow = GetEventsResponseDataEventsInner & {
  eventId: string
}

export const NodeEvents = (props: NodeEventsProps) => {
  const { node } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const { timeRange, onTimeRangeChange } = useTimeRange({
    includes: chartTimeRanges,
    defaultValue: '24h',
  })

  const [paginationParams, setPaginationParams] = useState({
    page: 1,
    itemsPerPage: DEFAULT_ITEMS_PER_PAGE,
  })

  const onPageChange = (page: number): void => {
    setPaginationParams((prev) => ({
      ...prev,
      page,
    }))
  }

  const onItemsPerPageChange = (itemsPerPage: ItemsPerPage): void => {
    setPaginationParams({
      page: 1,
      itemsPerPage,
    })
  }

  const {
    data: response,
    isLoading,
    hasResponseBeenReceived,
    getResource: getNodeEvents,
  } = useCosGetRequest(
    eventsApi.getEvents,
    (): EventsApiGetEventsRequest | undefined => {
      if (!node) return undefined
      return {
        dataCenter: dataCenter!.name,
        type: 'host',
        hosts: [node.hostname],
        past: timeRange,
        pageNum: paginationParams.page,
        pageSize: paginationParams.itemsPerPage,
      }
    },
  )

  const { isPolling } = usePolling(async () => {
    if (node) {
      await getNodeEvents()
    }
  }, NODE_DETAILS_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  const rows = useMemo<EventRow[]>(() => {
    const events = response?.events ?? []
    return events.map(
      (event, index) =>
        ({
          ...event,
          eventId: event.id,
          // Map events because `event.id` is not unique.
          id: `${event.id}-${index}`,
        }) satisfies EventRow,
    )
  }, [response?.events])

  return (
    <CosGeneralPanel
      topic={t('nodes.details.nodeEvents.title')}
      rightSlot={
        <TimeRangeDropdown
          timeRanges={chartTimeRanges}
          selectedItem={timeRange}
          disabled={!node}
          onChange={onTimeRangeChange}
        />
      }
    >
      <EventTable isLoading={showLoading} rows={rows} skeletonRowCount={10}>
        <EventTable.Column label={t('events.severity')} property="severity" />
        <EventTable.Column label={t('events.eventId')} property="eventId" />
        <EventTable.Column label={t('events.time')} property="time">
          {(time) => dayjs.respectTzOffset(time).format('YYYY/MM/DD HH:mm:ss')}
        </EventTable.Column>
        <EventTable.Column
          label={t('events.description')}
          property="description"
        />
        <EventTable.Column label={t('events.category')} property="category" />
        <EventTable.Column label={t('events.service')} property="service" />
        <EventTable.Column label={t('events.metadata')} property="metadata">
          {(metadata) => JSON.stringify(metadata)}
        </EventTable.Column>
      </EventTable>
      <CosPagination
        isLoading={showLoading}
        totalItems={response?.page.totalItemCount ?? 0}
        currentPage={paginationParams.page}
        itemsPerPage={paginationParams.itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </CosGeneralPanel>
  )
}
