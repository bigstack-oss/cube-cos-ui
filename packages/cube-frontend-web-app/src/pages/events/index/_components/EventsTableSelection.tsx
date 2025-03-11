import { useMemo } from 'react'
import { GetEventsResponseData, GetEventsTypeEnum } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'
import { formatEventTime } from '@cube-frontend/web-app/utils/date'

type ResponseEvent = GetEventsResponseData['events'][number]

type TableEvent = ResponseEvent & { eventId: string }

export const EventTable = GetCosBasicTable<TableEvent>()

type DisplayColumns = Pick<
  TableEvent,
  'severity' | 'eventId' | 'time' | 'description' | 'metadata'
>

const EventTableColumn: Record<
  keyof DisplayColumns,
  { label: string; property: keyof TableEvent }
> = {
  severity: { label: 'Severity', property: 'severity' },
  eventId: { label: 'Event ID', property: 'eventId' },
  time: { label: 'Time', property: 'time' },
  description: { label: 'Description', property: 'description' },
  metadata: { label: 'Metadata', property: 'metadata' },
}

const mapToTableEvent = (e: ResponseEvent, index: number): TableEvent => ({
  ...e,
  id: String(index),
  eventId: e.id,
})

type EventsTableSelectionProps = {
  eventType: GetEventsTypeEnum
  eventsData?: GetEventsResponseData | undefined
  isLoading?: boolean
}

export const EventsTableSelection = (props: EventsTableSelectionProps) => {
  const { eventsData, isLoading: isEventsDataLoading } = props

  const rows = useMemo<TableEvent[]>(() => {
    return eventsData?.events.map(mapToTableEvent) || []
  }, [eventsData?.events])

  return (
    <EventTable rows={rows} isLoading={isEventsDataLoading}>
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
          <span className="text-nowrap">{formatEventTime(time as string)}</span>
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
  )
}
