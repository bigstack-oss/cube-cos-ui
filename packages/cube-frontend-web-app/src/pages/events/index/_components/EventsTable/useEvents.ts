import { useContext } from 'react'
import {
  EventsApiGetEventsRequest,
  GetEventsResponseData,
  GetEventsResponseDataEventsInner,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { datesToRequestParams, EventsQuery } from './utils'

export type UseEvents = {
  isEventsLoading: boolean
  events: GetEventsResponseDataEventsInner[] | undefined
  getResource: () => Promise<GetEventsResponseData>
  totalItems: number
}

export const useEvents = (query: EventsQuery): UseEvents => {
  const { dataCenter } = useContext(DataCenterContext)

  const [debouncedSearchKeyword] = useDebounce(query.keyword, 300)

  const formattedDates = datesToRequestParams({
    start: query.startDate,
    end: query.endDate,
  })

  const {
    data,
    isLoading: isEventsLoading,
    getResource,
  } = useCosGetRequest(eventsApi.getEvents, () => {
    return {
      dataCenter: dataCenter!.name,
      type: query.type,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
      keyword: debouncedSearchKeyword,
      start: formattedDates.start,
      stop: formattedDates.stop,
      categories: query.category,
      severities: query.severity,
      hosts: query.host,
      instances: query.instance,
    } satisfies EventsApiGetEventsRequest
  })

  const totalItems = data?.page.totalItemCount ?? 0

  return {
    isEventsLoading,
    events: data?.events ?? [],
    getResource,
    totalItems,
  }
}
