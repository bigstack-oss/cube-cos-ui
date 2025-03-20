import { useContext } from 'react'
import {
  EventsApiGetEventsRequest,
  GetEventsResponseData,
  GetEventsResponseDataEventsInner,
  GetEventsTypeEnum,
  Page,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useEventsFilterStore } from '@cube-frontend/web-app/stores/events'
import { mapFilterToRequestParams } from './utils'

export type UseEventsOptions = {
  eventsType: GetEventsTypeEnum
  pageSize?: number
  pageNum?: number
}

export type UseEvents = {
  events: GetEventsResponseDataEventsInner[] | undefined
  pagination: Page | undefined
  isEventsLoading: boolean
  onEventsMutate: () => Promise<GetEventsResponseData>
}

export const useEvents = (options: UseEventsOptions): UseEvents => {
  const { eventsType, pageSize = 10, pageNum = 1 } = options

  const { name: dataCenter } = useContext(DataCenterContext)

  const { getFilters } = useEventsFilterStore()

  const { data, isLoading, getResource } = useCosGetRequest(
    eventsApi.getEvents,
    () => {
      if (!dataCenter) return null

      const filter = getFilters(eventsType)

      const requestParams = mapFilterToRequestParams(filter)

      return {
        ...requestParams,
        dataCenter: dataCenter,
        type: eventsType,
        pageSize,
        pageNum,
      } satisfies EventsApiGetEventsRequest
    },
  )

  return {
    events: data?.events ?? [],
    pagination: data?.page ?? ({} as Page),
    isEventsLoading: isLoading,
    onEventsMutate: getResource,
  }
}
