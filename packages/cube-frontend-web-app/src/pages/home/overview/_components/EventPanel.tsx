import { useContext, useMemo, useState } from 'react'
import { noop } from 'lodash'
import {
  EventsApiGetAbstractedEventsRequest,
  GetAbstractedEventsResponseData,
  GetAbstractedEventsTypeEnum,
} from '@cube-frontend/api'
import {
  CosContentSwitcher,
  CosPanel,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { formatEventTime } from '@cube-frontend/web-app/utils/date'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'

const HOME_PAGE_EVENT_ROW_LIMIT = 5

type ResponseEvent = GetAbstractedEventsResponseData['events'][number]

type TableEvent = ResponseEvent & { eventId: string }

export const EventTable = GetCosBasicTable<TableEvent>()

/**
 * The `id` field from the response is either `NET00003I` or `SDN00001I`, which will be duplicated.
 * Therefore, I map this `id` to `eventId` and assign an index to `id`, making it unique for use in the Table component.
 */
const mapToTableEvent = (e: ResponseEvent, index: number): TableEvent => ({
  ...e,
  id: String(index),
  eventId: e.id,
})

export const EventPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const [eventType, setEventType] =
    useState<GetAbstractedEventsTypeEnum>('system')

  const { data: eventsData, isLoading } = useCosStreamRequest(
    eventsApi.getAbstractedEvents,
    () => {
      if (!dataCenter.name) return null

      return {
        dataCenter: dataCenter.name,
        type: eventType,
        limit: HOME_PAGE_EVENT_ROW_LIMIT,
      } satisfies EventsApiGetAbstractedEventsRequest
    },
  )

  const rows = useMemo<TableEvent[]>(() => {
    return eventsData?.events.map(mapToTableEvent) || []
  }, [eventsData?.events])

  const updateTime = useUpdateTime(eventsData, isLoading)

  return (
    <CosPanel
      title="Events"
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      useContentWrapper={false}
      isLoading={isLoading}
    >
      <div className="flex flex-col gap-y-3">
        <CosContentSwitcher size="sm">
          <CosContentSwitcher.Item
            isActive={eventType === 'system'}
            onClick={() => setEventType('system')}
          >
            System
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={eventType === 'host'}
            onClick={() => setEventType('host')}
          >
            Host
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={eventType === 'instance'}
            onClick={() => setEventType('instance')}
          >
            Instance
          </CosContentSwitcher.Item>
        </CosContentSwitcher>
        <EventTable rows={rows} isLoading={isLoading}>
          <EventTable.Column label="Type" property="type" />
          <EventTable.Column
            label="Event ID"
            property="eventId"
            emphasize={true}
          />
          <EventTable.Column label="Description" property="description" />
          <EventTable.Column label="Metadata" property="metadata">
            {(metadata) => `${JSON.stringify(metadata)}`}
          </EventTable.Column>
          <EventTable.Column label="Time" property="time">
            {(time) => (
              <span className="text-nowrap">{formatEventTime(time)}</span>
            )}
          </EventTable.Column>
        </EventTable>
      </div>
    </CosPanel>
  )
}
