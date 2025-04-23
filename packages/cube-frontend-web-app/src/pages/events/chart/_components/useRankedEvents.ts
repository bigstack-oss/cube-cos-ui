import { useContext } from 'react'
import {
  EventsApiGetRankedEventsRequest,
  GetEventsTypeEnum,
  GetRankedEventsPastEnum,
  GetRankedEventsResponseDataEventsInner,
} from '@cube-frontend/api'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useEventsChartQuery } from './useEventsChartQuery'
import { ChartType, removeQueryKeyPrefix } from './utils'

const eventsChartRequestKeyMapping: Record<
  string,
  keyof EventsApiGetRankedEventsRequest
> = {
  category: 'category',
  severity: 'severity',
  name: 'host',
  id: 'instance',
}

const mapFilterToRequestParams = (
  chartType: ChartType,
  filter: Record<string, string>,
) => {
  return Object.entries(filter).reduce(
    (acc, [key, value]) => {
      const revertedKey = removeQueryKeyPrefix(chartType, key)

      if (value && revertedKey in eventsChartRequestKeyMapping) {
        const mappedKey =
          eventsChartRequestKeyMapping[
            revertedKey as keyof typeof eventsChartRequestKeyMapping
          ]
        acc[mappedKey] = value
      }
      return acc
    },
    {} as Record<string, string>,
  )
}

type UseRankedEventsOptions = {
  eventsType: GetEventsTypeEnum
  chartType: ChartType
  past: GetRankedEventsPastEnum
}

type UseRankedEvents = {
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  isRankedEventsLoading: boolean
}

export const useRankedEvents = (
  options: UseRankedEventsOptions,
): UseRankedEvents => {
  const { eventsType, chartType, past } = options

  const { dataCenter } = useContext(DataCenterContext)

  const { getCurrentQuery } = useEventsChartQuery()

  const { data, isLoading } = useCosGetRequest(
    eventsApi.getRankedEvents,
    () => {
      const { eventsFilter } = getCurrentQuery(chartType)

      const requestParams = mapFilterToRequestParams(chartType, eventsFilter)

      return {
        ...requestParams,
        dataCenter: dataCenter!.name,
        type: eventsType,
        limit: 24,
        past,
      } satisfies EventsApiGetRankedEventsRequest
    },
  )

  return { rankedEvents: data?.events, isRankedEventsLoading: isLoading }
}
