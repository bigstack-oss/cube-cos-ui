import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { isEmpty } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { ChartType, removeQueryKeyPrefix } from './utils'

const isValidEventsType = (type: string | null): boolean => {
  return Object.values(GetEventsTypeEnum).includes(type as GetEventsTypeEnum)
}

const getValidEventsType = (
  searchParams: URLSearchParams,
): GetEventsTypeEnum => {
  const urlEventsType = searchParams.get('eventsType')

  return isValidEventsType(urlEventsType)
    ? (urlEventsType as GetEventsTypeEnum)
    : GetEventsTypeEnum.System
}

const getMatchedFilterByPrefix = (
  chartType: ChartType,
  filter: Record<string, string>,
) => {
  return Object.fromEntries(
    Object.entries(filter).filter(([key]) => key.startsWith(chartType)),
  )
}

const mapToRedirectQuery = (
  currentQuery: Record<string, string>,
  chartType: ChartType,
): string => {
  const params = new URLSearchParams()
  Object.entries(currentQuery).forEach(([key, value]) => {
    params.set(removeQueryKeyPrefix(chartType, key), value)
  })
  return params.toString()
}

export type UseEventsChartQuery = {
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (eventsType: GetEventsTypeEnum) => void
  handleEventsQueryChange: (updates: Record<string, string | null>) => void
  getCurrentQuery: (chartType: ChartType) => {
    eventsFilter: Record<string, string>
    /**
     * Checks whether the filter is empty, excluding the `eventsType` field.
     */
    isEventsFilterEmpty: boolean
  }
  getRedirectQuery: (chartType: ChartType, eventId: string) => string
}

export const useEventsChartQuery = (): UseEventsChartQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [eventsType, setEventsType] = useState<GetEventsTypeEnum>(
    getValidEventsType(searchParams),
  )

  useEffect(() => {
    const urlEventsType = searchParams.get('eventsType')

    if (urlEventsType !== eventsType) {
      const validEventsType = getValidEventsType(searchParams)
      setEventsType(validEventsType)
      setSearchParams({ eventsType: validEventsType }, { replace: true })
    }
  }, [eventsType, searchParams, setSearchParams])

  const handleEventsTypeChange = (eventsType: GetEventsTypeEnum) => {
    setSearchParams({ eventsType }, { replace: true })
  }

  const handleEventsQueryChange = (updates: Record<string, string | null>) => {
    const newParams = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([key, value]) => {
      if (value) {
        newParams.set(key, value)
      } else {
        newParams.delete(key)
      }
    })
    setSearchParams(newParams, { replace: true })
  }

  const getCurrentQuery = (chartType: ChartType) => {
    const rawFilter = Object.fromEntries(searchParams) as Record<string, string>

    const eventsType = rawFilter.eventsType
    const matchedFilter = getMatchedFilterByPrefix(chartType, rawFilter)

    return {
      eventsFilter: { ...matchedFilter, eventsType },
      isEventsFilterEmpty: isEmpty(matchedFilter),
    }
  }

  const getRedirectQuery = (chartType: ChartType, eventId: string) => {
    const rawFilter = Object.fromEntries(searchParams) as Record<string, string>

    const eventsType = rawFilter.eventsType
    const matchedFilter = getMatchedFilterByPrefix(chartType, rawFilter)

    const newQueryString = mapToRedirectQuery(matchedFilter, chartType)
    return `/events?eventsType=${encodeURIComponent(eventsType)}&keyword=${encodeURIComponent(eventId)}&${newQueryString}`
  }

  return {
    eventsType,
    handleEventsTypeChange,
    handleEventsQueryChange,
    getCurrentQuery,
    getRedirectQuery,
  }
}
