import { useContext, useMemo } from 'react'
import { uniqueId } from 'lodash'
import {
  EventsApiGetRankedEventsRequest,
  GetRankedEventsResponseDataEventsInner,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { ChartQuery } from './useEventsChartQuery'
import { ChartType, getRequestQueryByChartType } from './utils'

export type RankedEvent = GetRankedEventsResponseDataEventsInner & {
  uniqueId: string
}

type UseRankedEvents = {
  rankedEvents: RankedEvent[]
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

  /**
   * Sort the events in descending order based on the 'percent' field
   * then slice to keep only the top 24 events.
   * Add a `uniqueId` to each ranked event, as the original event ID
   * may not be unique. The `uniqueId` helps distinguish each entry.
   */
  const rankedEvents = useMemo(() => {
    const events = data ? data.events : []
    const sortedEvents = events.sort((a, b) => b.percent - a.percent)

    return sortedEvents.map((event) => ({
      ...event,
      uniqueId: uniqueId('ranked-event'),
    }))
  }, [data])

  return { rankedEvents, isRankedEventsLoading: isLoading }
}
