import dayjs from 'dayjs'
import { lowerFirst, upperFirst } from 'lodash'
import {
  EventsApiGetRankedEventsRequest,
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
  GetEventsTypeEnum,
} from '@cube-frontend/api'
import { timeRangeDelta } from '@cube-frontend/web-app/hooks/useTimeFrame/timeFrameUtils'
import { ChartQuery, FilterKeys } from './useEventsChartQuery'
import { getValidTimeRange } from './timeRangeUtils'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export type ChartType = 'proportion' | 'comparison'

export type FilterKeysResponse =
  | keyof GetEventFilterConditionResponseDataSystem
  | keyof GetEventFilterConditionResponseDataHost
  | keyof GetEventFilterConditionResponseDataInstance

const filterKeyMapping: Record<
  FilterKeysResponse,
  Record<ChartType, FilterKeys>
> = {
  categories: {
    proportion: 'proportionCategory',
    comparison: 'comparisonCategory',
  },
  severities: {
    proportion: 'proportionSeverity',
    comparison: 'comparisonSeverity',
  },
  names: {
    proportion: 'proportionHost',
    comparison: 'comparisonHost',
  },
  ids: {
    proportion: 'proportionInstance',
    comparison: 'comparisonInstance',
  },
}

export const getFilterKeyByChartType = (
  chartType: ChartType,
  key: FilterKeysResponse,
): FilterKeys | undefined => {
  return filterKeyMapping[key][chartType] || undefined
}

const filterLabelMapping: Record<FilterKeysResponse, string> = {
  categories: 'Category',
  severities: 'Severity',
  names: 'Host',
  ids: 'Instance',
}

export const getFilterLabel = (key: FilterKeysResponse) => {
  return filterLabelMapping[key] || ''
}

const getValidType = (type: string): GetEventsTypeEnum => {
  const defaultType = GetEventsTypeEnum.System

  if (!type) {
    return defaultType
  }

  const validTypes = Object.values(GetEventsTypeEnum) as string[]

  if (validTypes.includes(type)) {
    return type as GetEventsTypeEnum
  }

  return defaultType
}

export const initChartQuery = (searchParams: URLSearchParams): ChartQuery => {
  const type = getValidType(searchParams.get('type') ?? '')

  const past = getValidTimeRange(searchParams.get('past') ?? '')

  const proportionCategory = searchParams.get('proportionCategory') ?? undefined
  const comparisonCategory = searchParams.get('comparisonCategory') ?? undefined

  const proportionSeverity = searchParams.get('proportionSeverity') ?? undefined
  const comparisonSeverity = searchParams.get('comparisonSeverity') ?? undefined

  const proportionHost = searchParams.get('proportionHost') ?? undefined
  const comparisonHost = searchParams.get('comparisonHost') ?? undefined

  const proportionInstance = searchParams.get('proportionInstance') ?? undefined
  const comparisonInstance = searchParams.get('comparisonInstance') ?? undefined

  return {
    type,
    past,
    proportionCategory,
    comparisonCategory,
    proportionSeverity,
    comparisonSeverity,
    proportionHost,
    comparisonHost,
    proportionInstance,
    comparisonInstance,
  }
}

export const removeQueryKeyPrefix = (
  chartType: ChartType,
  queryKey: string,
): string => {
  return lowerFirst(queryKey.replace(chartType, ''))
}

const getQueryValue = (
  chartType: ChartType,
  queryKey: keyof EventsApiGetRankedEventsRequest,
  chartQuery: ChartQuery,
) => {
  const dynamicKey = `${chartType}${upperFirst(queryKey)}` as keyof ChartQuery
  return chartQuery[dynamicKey]
}

export const getRequestQueryByChartType = (
  chartType: ChartType,
  chartQuery: ChartQuery,
): Pick<
  EventsApiGetRankedEventsRequest,
  'type' | 'past' | 'category' | 'severity' | 'host' | 'instance'
> => {
  return {
    type: chartQuery.type,
    past: chartQuery.past,
    category: getQueryValue(chartType, 'category', chartQuery),
    severity: getQueryValue(chartType, 'severity', chartQuery),
    host: getQueryValue(chartType, 'host', chartQuery),
    instance: getQueryValue(chartType, 'instance', chartQuery),
  }
}

export const getRedirectUrl = (
  chartType: ChartType,
  chartQuery: ChartQuery,
  eventId: string,
): string => {
  const { value, unit } = timeRangeDelta[chartQuery.past]
  const endDate = dayjs()
  const startDate = endDate.add(value, unit)

  const searchParams = new URLSearchParams({
    type: chartQuery.type,
    keyword: eventId,
    start: startDate.format(),
    stop: endDate.format(),
  })

  const category = getQueryValue(chartType, 'category', chartQuery)
  const severity = getQueryValue(chartType, 'severity', chartQuery)
  const host = getQueryValue(chartType, 'host', chartQuery)
  const instance = getQueryValue(chartType, 'instance', chartQuery)

  if (category) searchParams.set('category', category)
  if (severity) searchParams.set('severity', severity)
  if (host) searchParams.set('host', host)
  if (instance) searchParams.set('instance', instance)

  return `${CosRoutesEnum.EVENTS_PAGE}?${searchParams.toString()}`
}
