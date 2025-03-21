import { useState, useContext, useEffect } from 'react'
import { DEFAULT_ITEMS_PER_PAGE, ItemsPerPage } from '@cube-frontend/ui-library'

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
import { useEventsQuery } from './useEventsQuery'
import { mapFilterToRequestParams } from './utils'

export type UseEventsOptions = {
  eventsType: GetEventsTypeEnum
}

export type UseEvents = {
  events: GetEventsResponseDataEventsInner[] | undefined
  pagination: Page | undefined
  isEventsLoading: boolean
  getResource: () => Promise<GetEventsResponseData>
  currentQuery: {
    eventsFilter: Record<string, string>
    isEventsFilterEmpty: boolean
  }
  currentPageNum: number
  currentPageSize: ItemsPerPage
  setCurrentPageNum: React.Dispatch<React.SetStateAction<number>>
  setCurrentPageSize: React.Dispatch<React.SetStateAction<ItemsPerPage>>
}

export const useEvents = (options: UseEventsOptions): UseEvents => {
  const { eventsType } = options

  const [currentPageNum, setCurrentPageNum] = useState(1)

  const [currentPageSize, setCurrentPageSize] = useState<ItemsPerPage>(
    DEFAULT_ITEMS_PER_PAGE,
  )

  const { name: dataCenter } = useContext(DataCenterContext)

  const { getCurrentQuery } = useEventsQuery()

  const currentQuery = getCurrentQuery()

  useEffect(() => {
    setCurrentPageNum(1)
  }, [eventsType, currentQuery])

  const { data, isLoading, getResource } = useCosGetRequest(
    eventsApi.getEvents,
    () => {
      if (!dataCenter) return null

      const requestParams = mapFilterToRequestParams(currentQuery.eventsFilter)

      return {
        ...requestParams,
        dataCenter: dataCenter,
        type: eventsType,
        pageSize: currentPageSize,
        pageNum: currentPageNum,
      } satisfies EventsApiGetEventsRequest
    },
  )

  return {
    events: data?.events ?? [],
    pagination: data?.page ?? ({} as Page),
    isEventsLoading: isLoading,
    getResource,
    currentQuery,
    currentPageNum,
    currentPageSize,
    setCurrentPageNum,
    setCurrentPageSize,
  }
}
