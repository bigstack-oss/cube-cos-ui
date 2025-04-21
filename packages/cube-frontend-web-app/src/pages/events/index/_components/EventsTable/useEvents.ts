import { useContext } from 'react'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'

import {
  EventsApiGetEventsRequest,
  GetEventsResponseData,
  GetEventsResponseDataEventsInner,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useDebounce } from '@cube-frontend/web-app/hooks/useDebounce'
import { mapFilterToRequestParams } from './utils'

export type UseEventsOptions = {
  eventsType: GetEventsTypeEnum
  getCurrentQuery: () => {
    eventsFilter: Record<string, string>
    isEventsFilterEmpty: boolean
  }
}

export type UseEvents = {
  isEventsLoading: boolean
  events: GetEventsResponseDataEventsInner[] | undefined

  getResource: () => Promise<GetEventsResponseData>
  currentQuery: {
    eventsFilter: Record<string, string>
    isEventsFilterEmpty: boolean
  }
  currentPage: number
  itemsPerPage: ItemsPerPage
  totalItems: number
}

export const useEvents = (options: UseEventsOptions): UseEvents => {
  const { eventsType, getCurrentQuery } = options

  const { dataCenter } = useContext(DataCenterContext)

  const currentQuery = getCurrentQuery()

  const currentPage = currentQuery.eventsFilter?.page
    ? Number(currentQuery.eventsFilter.page)
    : 1

  const itemsPerPage = currentQuery.eventsFilter?.size
    ? (Number(currentQuery.eventsFilter.size) as ItemsPerPage)
    : DEFAULT_ITEMS_PER_PAGE

  const { keyword, ...requestParams } = mapFilterToRequestParams(
    currentQuery.eventsFilter,
  )

  const [debouncedSearchKeyword, _] = useDebounce(keyword, 300)

  const {
    data,
    isLoading: isEventsLoading,
    getResource,
  } = useCosGetRequest(eventsApi.getEvents, () => {
    if (!dataCenter) return null

    return {
      ...requestParams,
      dataCenter: dataCenter!.name,
      type: eventsType,
      pageNum: currentPage,
      pageSize: itemsPerPage,
      keyword: debouncedSearchKeyword,
    } satisfies EventsApiGetEventsRequest
  })

  const totalItems = data?.page.totalItemCount ?? 0

  return {
    currentQuery,
    isEventsLoading,
    events: data?.events ?? [],
    getResource,
    currentPage,
    itemsPerPage,
    totalItems,
  }
}
