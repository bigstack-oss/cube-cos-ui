import { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { noop } from 'lodash'
import {
  EventsApiGetAbstractedEventsRequest,
  GetAbstractedEventsResponseData,
  GetAbstractedEventsTypeEnum,
} from '@cube-frontend/api'
import {
  CosContentSwitcher,
  CosDashboardPanel,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { formatEventTime } from '@cube-frontend/web-app/utils/date'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../homeOverviewPageUtils'

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
  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const [eventType, setEventType] =
    useState<GetAbstractedEventsTypeEnum>('system')

  const {
    data: eventsData,
    isLoading,
    hasResponseBeenReceived,
    getResource: getAbstractedEvents,
  } = useCosGetRequest(eventsApi.getAbstractedEvents, () => {
    return {
      dataCenter: dataCenter!.name,
      type: eventType,
      limit: HOME_PAGE_EVENT_ROW_LIMIT,
    } satisfies EventsApiGetAbstractedEventsRequest
  })

  const { isPolling } = usePolling(
    getAbstractedEvents,
    HOME_OVERVIEW_PAGE_POLLING_INTERVAL,
  )

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  const rows = useMemo<TableEvent[]>(() => {
    return eventsData?.events.map(mapToTableEvent) || []
  }, [eventsData?.events])

  const updateTime = useUpdateTime(eventsData, showLoading)

  return (
    <CosDashboardPanel
      title={t('home.overview.events.title')}
      time={updateTime}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={CosRoutesEnum.EVENTS_PAGE} />}
      useContentWrapper={false}
      isTimeLoading={showLoading}
    >
      <div className="flex flex-col gap-y-3">
        <CosContentSwitcher variant="default" size="sm">
          <CosContentSwitcher.Item
            isActive={eventType === 'system'}
            onClick={() => setEventType('system')}
          >
            {t('home.overview.events.system')}
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={eventType === 'host'}
            onClick={() => setEventType('host')}
          >
            {t('home.overview.events.host')}
          </CosContentSwitcher.Item>
          <CosContentSwitcher.Item
            isActive={eventType === 'instance'}
            onClick={() => setEventType('instance')}
          >
            {t('home.overview.events.instance')}
          </CosContentSwitcher.Item>
        </CosContentSwitcher>
        <EventTable rows={rows} isLoading={showLoading}>
          <EventTable.Column
            label={t('home.overview.events.severity')}
            property="severity"
          />
          <EventTable.Column
            label={t('home.overview.events.eventId')}
            property="eventId"
            emphasize={true}
          />
          <EventTable.Column
            label={t('home.overview.events.description')}
            property="description"
          />
          <EventTable.Column
            label={t('home.overview.events.metadata')}
            property="metadata"
          >
            {(metadata) => `${JSON.stringify(metadata)}`}
          </EventTable.Column>
          <EventTable.Column
            label={t('home.overview.events.time')}
            property="time"
          >
            {(time) => (
              <span className="text-nowrap">{formatEventTime(time)}</span>
            )}
          </EventTable.Column>
        </EventTable>
      </div>
    </CosDashboardPanel>
  )
}
