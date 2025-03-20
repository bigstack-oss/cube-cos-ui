import { useContext, useMemo, useEffect } from 'react'
import { GetEventsResponseData } from '@cube-frontend/api'
import { CosPagination, GetCosBasicTable } from '@cube-frontend/ui-library'
import { formatEventTime } from '@cube-frontend/web-app/utils/date'
import { EventsFilterTableContext } from './context'

type EventResponse = GetEventsResponseData['events'][number]

type EventTableType = EventResponse & { eventId: string }

export const EventTable = GetCosBasicTable<EventTableType>()

type DisplayColumns = Pick<
  EventTableType,
  'severity' | 'eventId' | 'time' | 'description' | 'metadata'
>

const EventTableColumn: Record<
  keyof DisplayColumns,
  { label: string; property: keyof EventTableType }
> = {
  severity: { label: 'Severity', property: 'severity' },
  eventId: { label: 'Event ID', property: 'eventId' },
  time: { label: 'Time', property: 'time' },
  description: { label: 'Description', property: 'description' },
  metadata: { label: 'Metadata', property: 'metadata' },
}

const mapToEventTable = (e: EventResponse, index: number): EventTableType => ({
  ...e,
  id: String(index),
  eventId: e.id,
})

export const EventsTableSelection = () => {
  const {
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
    events,
    pagination,
    isEventsLoading,
  } = useContext(EventsFilterTableContext)

  const rows = useMemo<EventTableType[]>(() => {
    return events?.map(mapToEventTable) || []
  }, [events])

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
  }

  useEffect(() => {
    setCurrentPage(pagination?.number ?? 1)
  }, [pagination, setCurrentPage])

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
        totalItems={pagination?.totalItemCount || 0}
        currentPage={currentPage}
        onPageChange={handleCurrentPageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  )
}
