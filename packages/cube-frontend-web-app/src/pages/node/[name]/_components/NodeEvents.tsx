import {
  EventsApiGetEventsRequest,
  GetEventsResponseDataEventsInner,
  Node,
} from '@cube-frontend/api'
import {
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
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import dayjs from 'dayjs'
import { useContext, useMemo, useState } from 'react'
import { chartTimeRanges } from './nodeChartsUtils'
import { Panel } from './Panel'

type NodeEventsProps = {
  node: Node | undefined
}

const EventTable = GetCosBasicTable<EventRow>()

type EventRow = GetEventsResponseDataEventsInner & {
  eventId: string
}

export const NodeEvents = (props: NodeEventsProps) => {
  const { node } = props

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

  const { data: response, getResource: getNodeEvents } = useCosGetRequest(
    eventsApi.getEvents,
    (): EventsApiGetEventsRequest | undefined => {
      if (!node) return undefined
      return {
        dataCenter: dataCenter!.name,
        type: 'host',
        host: node.hostname,
        past: timeRange,
        pageNum: paginationParams.page,
        pageSize: paginationParams.itemsPerPage,
      }
    },
  )

  useSequentialInterval(
    () => {
      if (node) {
        getNodeEvents()
      }
    },
    5000,
    {
      immediate: false,
    },
  )

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
    <Panel className="gap-y-4">
      <div className="flex items-center justify-between">
        <span className="primary-h5 text-functional-text">Node Events</span>
        <TimeRangeDropdown
          timeRanges={chartTimeRanges}
          selectedItem={timeRange}
          disabled={!node}
          onChange={onTimeRangeChange}
        />
      </div>
      <EventTable isLoading={!node} rows={rows} skeletonRowCount={10}>
        <EventTable.Column label="Event ID" property="eventId" />
        <EventTable.Column label="Timestamp" property="time">
          {(time) => dayjs.respectTzOffset(time).format('YYYY/MM/DD HH:mm:ss')}
        </EventTable.Column>
        <EventTable.Column label="Description" property="description" />
        <EventTable.Column label="Category" property="category" />
        <EventTable.Column label="Service" property="service" />
        <EventTable.Column label="Metadata" property="metadata">
          {(metadata) => JSON.stringify(metadata)}
        </EventTable.Column>
      </EventTable>
      <CosPagination
        isLoading={!node}
        totalItems={response?.page.totalItemCount ?? 0}
        currentPage={paginationParams.page}
        itemsPerPage={paginationParams.itemsPerPage}
        onPageChange={onPageChange}
        onItemsPerPageChange={onItemsPerPageChange}
      />
    </Panel>
  )
}
