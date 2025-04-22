import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { isEmpty } from 'lodash'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import {
  ChartType,
  ChartTimeRanges,
  getValidTimeRange,
  getValidEventsType,
  getMatchedFilterByPrefix,
  mapToTimeRangeQuery,
  mapToRedirectQuery,
} from './utils'

export type UseEventsChartQuery = {
  past: ChartTimeRanges
  eventsType: GetEventsTypeEnum
  handleEventsTypeChange: (eventsType: GetEventsTypeEnum) => void
  handleTimeRangeChange: (timeRange: ChartTimeRanges) => void
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

  const [past, setPast] = useState<ChartTimeRanges>(
    getValidTimeRange(searchParams),
  )

  const [eventsType, setEventsType] = useState<GetEventsTypeEnum>(
    getValidEventsType(searchParams),
  )

  useEffect(() => {
    const currentPast = searchParams.get('past')
    const currentEventsType = searchParams.get('eventsType')

    const validPast = getValidTimeRange(searchParams)
    const validEventsType = getValidEventsType(searchParams)

    const newParams = new URLSearchParams(searchParams)
    let shouldUpdate = false

    if (past !== currentPast) {
      newParams.set('past', validPast)
      setPast(validPast)
      shouldUpdate = true
    }

    if (eventsType !== currentEventsType) {
      newParams.set('eventsType', validEventsType)
      setEventsType(validEventsType)
      shouldUpdate = true
    }

    if (shouldUpdate) {
      setSearchParams(newParams, { replace: true })
    }
  }, [eventsType, past, searchParams, setSearchParams])

  const handleEventsTypeChange = (type: GetEventsTypeEnum) => {
    const newParams = new URLSearchParams()
    newParams.set('eventsType', type)
    newParams.set('past', past)

    setSearchParams(newParams, { replace: true })
  }

  const handleTimeRangeChange = (timeRange: ChartTimeRanges) => {
    const newParams = new URLSearchParams()
    newParams.set('past', timeRange)
    newParams.set('eventsType', eventsType)

    setSearchParams(newParams, { replace: true })
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
    const { start, end } = mapToTimeRangeQuery(past)
    const filteredQueryString = mapToRedirectQuery(matchedFilter, chartType)

    const baseParams = new URLSearchParams({
      eventsType,
      keyword: eventId,
      start,
      end,
    })

    return filteredQueryString
      ? `/events?${baseParams.toString()}&${filteredQueryString}`
      : `/events?${baseParams.toString()}`
  }

  return {
    past,
    eventsType,
    handleEventsTypeChange,
    handleTimeRangeChange,
    handleEventsQueryChange,
    getCurrentQuery,
    getRedirectQuery,
  }
}
