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
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { ChartQuery, FilterKeys } from './useEventsChartQuery'
import { getValidTimeRange } from './timeRangeUtils'
import { RankedEvent } from './useRankedEvents'

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

  const proportionCategory =
    searchParams.getAll('proportionCategory') ?? undefined

  const comparisonCategory =
    searchParams.getAll('comparisonCategory') ?? undefined

  const proportionSeverity =
    searchParams.getAll('proportionSeverity') ?? undefined

  const comparisonSeverity =
    searchParams.getAll('comparisonSeverity') ?? undefined

  const proportionHost = searchParams.getAll('proportionHost') ?? undefined

  const comparisonHost = searchParams.getAll('comparisonHost') ?? undefined

  const proportionInstance =
    searchParams.getAll('proportionInstance') ?? undefined

  const comparisonInstance =
    searchParams.getAll('comparisonInstance') ?? undefined

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
  'type' | 'past' | 'categories' | 'severities' | 'hosts' | 'instances'
> => {
  return {
    type: chartQuery.type,
    past: chartQuery.past,
    categories: getQueryValue(
      chartType,
      'category',
      chartQuery,
    ) as EventsApiGetRankedEventsRequest['categories'],
    severities: getQueryValue(
      chartType,
      'severity',
      chartQuery,
    ) as string[] as EventsApiGetRankedEventsRequest['severities'],
    hosts: getQueryValue(
      chartType,
      'host',
      chartQuery,
    ) as EventsApiGetRankedEventsRequest['hosts'],
    instances: getQueryValue(
      chartType,
      'instance',
      chartQuery,
    ) as EventsApiGetRankedEventsRequest['instances'],
  }
}

export const getRedirectUrl = (
  chartQuery: ChartQuery,
  targetEvent: RankedEvent | undefined,
): string => {
  if (!targetEvent) return ''

  const { value, unit } = timeRangeDelta[chartQuery.past]
  const endDate = dayjs()
  const startDate = endDate.add(value, unit)

  const searchParams = new URLSearchParams({
    type: chartQuery.type,
    keyword: targetEvent.id,
    startDate: startDate.format(),
    endDate: endDate.format(),
  })

  return `${CosRoutesEnum.EVENTS_PAGE}?${searchParams.toString()}`
}

export const getChartLabelByEventsType = (
  eventsType: GetEventsTypeEnum,
  event: RankedEvent,
): string => {
  if (eventsType === 'host') {
    const hostName = event.host ? ` (${event.host})` : ''
    return event.id + hostName
  }

  if (eventsType === 'instance') {
    const first8DigitOfInstanceId = event.instanceId?.split('-')[0]
      ? ` (${event.instanceId?.split('-')[0]})`
      : ''
    return event.id + first8DigitOfInstanceId
  }

  return event.id
}

/**
 * Convert hex color to RGBA format
 * @param hexCode - Hex color code (e.g., '#FF5733')
 * @param alpha - Alpha value (0 to 1)
 */
export const hexToRGBA = (hexCode: string, alpha: number) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},${alpha})`
}
