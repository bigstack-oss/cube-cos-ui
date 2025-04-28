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
import { EventsQuery } from './useEventsQuery'
import { datesToRequestParams } from './utils'

export type UseEvents = {
  isEventsLoading: boolean
  events: GetEventsResponseDataEventsInner[] | undefined
  getResource: () => Promise<GetEventsResponseData>
  totalItems: number
}

export const useEvents = (eventsQuery: EventsQuery): UseEvents => {
  const { dataCenter } = useContext(DataCenterContext)

  const { keyword, start, stop, ...restQuery } = eventsQuery

  const [debouncedSearchKeyword] = useDebounce(keyword, 300)

  const formattedDates = datesToRequestParams({ start, end: stop })

  const {
    data,
    isLoading: isEventsLoading,
    getResource,
  } = useCosGetRequest(eventsApi.getEvents, () => {
    return {
      dataCenter: dataCenter!.name,
      keyword: debouncedSearchKeyword,
      ...restQuery,
      ...formattedDates,
    } as EventsApiGetEventsRequest
  })

  const totalItems = data?.page.totalItemCount ?? 0

  return {
    isEventsLoading,
    events: data?.events ?? [],
    getResource,
    totalItems,
  }
}
