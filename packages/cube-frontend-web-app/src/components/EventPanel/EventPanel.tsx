import { useContext, useEffect, useState } from 'react'
import { eventsApi, GetEventsResponseData } from '@cube-frontend/api'
import { GetCosBasicTable } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosPanel } from '../CosPanel/CosPanel'

export const EventTable =
  GetCosBasicTable<GetEventsResponseData['events'][number]>()

export const EventPanel = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [events, setEvents] = useState<GetEventsResponseData | undefined>()

  const dataCenter = useContext(DataCenterContext)

  useEffect(() => {
    eventsApi
      .getEvents(
        dataCenter.name,
        'system',
        '2024-01-01T00:00:00Z',
        '2026-01-01T00:00:00Z',
        1,
        5,
      )
      .then((res) => {
        setEvents(res.data.data)
        setIsLoading(false)
      })
  }, [dataCenter.name])

  return (
    <CosPanel title="Events">
      <EventTable rows={events?.events || []} isLoading={isLoading}>
        <EventTable.Column label="Type" property="type" />
        <EventTable.Column label="Event ID" property="id" emphasize={true} />
        <EventTable.Column label="Description" property="description" />
        <EventTable.Column label="Host" property="host" />
        <EventTable.Column label="Category" property="category" />
        <EventTable.Column label="Service" property="service" />
        <EventTable.Column label="Metadata" property="metadata">
          {(metadata) => `${JSON.stringify(metadata)}`}
        </EventTable.Column>
        <EventTable.Column label="Time" property="time" />
        {/* {(running) => `${running.toLocaleString('en-US')} days`}
      </BaseEventTable.Column> */}
      </EventTable>
    </CosPanel>
  )
}
