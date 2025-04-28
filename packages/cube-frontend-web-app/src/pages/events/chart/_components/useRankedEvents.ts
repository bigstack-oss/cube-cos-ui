import { useContext } from 'react'
import {
  EventsApiGetRankedEventsRequest,
  GetRankedEventsResponseDataEventsInner,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ChartQuery } from './useEventsChartQuery'
import { ChartType, getRequestQueryByChartType } from './utils'

type UseRankedEvents = {
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  isRankedEventsLoading: boolean
}

export const useRankedEvents = (
  chartType: ChartType,
  chartQuery: ChartQuery,
): UseRankedEvents => {
  const { dataCenter } = useContext(DataCenterContext)

  const requestQuery = getRequestQueryByChartType(chartType, chartQuery)

  const { data, isLoading } = useCosGetRequest(
    eventsApi.getRankedEvents,
    () => {
      return {
        ...requestQuery,
        dataCenter: dataCenter!.name,
        limit: 24,
      } satisfies EventsApiGetRankedEventsRequest
    },
  )

  return { rankedEvents: data?.events, isRankedEventsLoading: isLoading }
}
