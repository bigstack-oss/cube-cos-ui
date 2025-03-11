import {
  EventsApiGetEventsRequest,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import { EventsTableFilter } from './EventsTableFilter'
import { EventsTableSelection } from './EventsTableSelection'
import { useContext, useState } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useFilterStore } from '@cube-frontend/web-app/stores/EventsFilterStore'
import {
  CosPagination,
  DEFAULT_ITEMS_PER_PAGE,
} from '@cube-frontend/ui-library'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { getFullEventRequestParams } from './utils'

type EventsTabContentProps = {
  eventType: GetEventsTypeEnum
}

export const EventsTabContent = (props: EventsTabContentProps) => {
  const { eventType } = props

  const dataCenter = useContext(DataCenterContext)

  const { filters } = useFilterStore()

  const [currentPage, setCurrentPage] = useState(1)

  const [itemsPerPage, setItemsPerPage] = useState(DEFAULT_ITEMS_PER_PAGE)

  const {
    data: eventsData,
    isLoading,
    getResource,
  } = useCosGetRequest(eventsApi.getEvents, () => {
    if (!dataCenter.name) return null

    const fullRequestParams = getFullEventRequestParams(eventType, filters, {
      dataCenter: dataCenter.name,
      type: eventType,
      pageSize: itemsPerPage,
      pageNum: currentPage,
    } satisfies EventsApiGetEventsRequest)

    return fullRequestParams
  })

  const handleCurrentPageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <EventsTableFilter eventType={eventType} getResource={getResource} />
        <EventsTableSelection
          eventType={eventType}
          eventsData={eventsData}
          isLoading={isLoading}
        />
      </div>
      <CosPagination
        isLoading={isLoading}
        totalItems={eventsData?.page.total || 0}
        currentPage={currentPage}
        onPageChange={handleCurrentPageChange}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={setItemsPerPage}
      />
    </div>
  )
}
