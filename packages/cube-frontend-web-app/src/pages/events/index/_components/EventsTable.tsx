import { useMemo } from 'react'
import {
  GetEventsResponseData,
  GetEventsResponseDataEventsInner,
} from '@cube-frontend/api'
import {
  CosPagination,
  GetCosBasicTable,
  ItemsPerPage,
} from '@cube-frontend/ui-library'
import { formatEventTime } from '@cube-frontend/web-app/utils/date'
import { useEventTableColumns } from './useEventTableColumns'

type EventResponse = GetEventsResponseData['events'][number]

export type EventTableType = EventResponse & { eventId: string }

export const EventTable = GetCosBasicTable<EventTableType>()

const mapToEventTable = (e: EventResponse, index: number): EventTableType => ({
  ...e,
  id: String(index),
  eventId: e.id,
})

type EventsTableSelectionProps = {
  isEventsLoading: boolean
  events: GetEventsResponseDataEventsInner[] | undefined
  currentPage: number
  itemsPerPage: ItemsPerPage
  totalItems: number
  onPageNumChange: (pageNum: number) => void
  onPageSizeChange: (pageSize: ItemsPerPage) => void
}

export const EventsTable = (props: EventsTableSelectionProps) => {
  const {
    isEventsLoading,
    events,
    currentPage,
    itemsPerPage,
    totalItems,
    onPageNumChange,
    onPageSizeChange,
  } = props

  const rows = useMemo<EventTableType[]>(() => {
    return events?.map(mapToEventTable) || []
  }, [events])

  const EventTableColumn = useEventTableColumns()

  return (
    <div className="flex flex-col gap-6">
      <EventTable rows={rows} isLoading={isEventsLoading}>
        <EventTable.Column
          label={EventTableColumn.severity.label}
          property={EventTableColumn.severity.property}
        />
        <EventTable.Column
          label={EventTableColumn.eventId.label}
          property={EventTableColumn.eventId.property}
          emphasize={true}
        />
        <EventTable.Column
          label={EventTableColumn.time.label}
          property={EventTableColumn.time.property}
        >
          {(time) => (
            <span className="text-nowrap">
              {formatEventTime(time as string)}
            </span>
          )}
        </EventTable.Column>
        <EventTable.Column
          label={EventTableColumn.description.label}
          property={EventTableColumn.description.property}
        />
        <EventTable.Column
          label={EventTableColumn.metadata.label}
          property={EventTableColumn.metadata.property}
        >
          {(metadata) => `${JSON.stringify(metadata)}`}
        </EventTable.Column>
      </EventTable>
      <CosPagination
        isLoading={isEventsLoading}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={totalItems}
        onPageChange={onPageNumChange}
        onItemsPerPageChange={onPageSizeChange}
      />
    </div>
  )
}
