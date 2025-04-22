import dayjs from 'dayjs'
import { lowerFirst, upperFirst } from 'lodash'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'
import { GetEventsTypeEnum } from '@cube-frontend/api'

export type ChartType = 'proportion' | 'comparison'

export const removeQueryKeyPrefix = (
  chartType: ChartType,
  queryKey: string,
): string => {
  return lowerFirst(queryKey.replace(chartType, ''))
}

const dropdownFilterKeyMapping: Record<string, string> = {
  severities: 'severity',
  categories: 'category',
  ids: 'id',
  names: 'name',
}

type DropdownFilterValues = {
  dropdownFilterLabel: string
  queryKey: string
}

export const mapToDropdownFilterValues = (
  chartType: ChartType,
  key: string,
): DropdownFilterValues => {
  const dropdownFilterKey = dropdownFilterKeyMapping[key]

  if (!dropdownFilterKey) {
    console.warn('Not a valid filter key')
  }

  /**
   * The current implementation is not yet compatible with i18n.
   */
  const dropdownFilterLabel = upperFirst(dropdownFilterKey) ?? ''

  const queryKey = chartType + dropdownFilterLabel

  return { dropdownFilterLabel, queryKey }
}

export const chartTimeRanges = [
  '1h',
  '24h',
  '7d',
  '14d',
] as const satisfies TimeRange[]

export type ChartTimeRanges = (typeof chartTimeRanges)[number]

const timeRangeToDays: Record<ChartTimeRanges, number> = {
  '1h': 0,
  '24h': 0,
  '7d': 7,
  '14d': 14,
}

export const mapToTimeRangeQuery = (past: ChartTimeRanges) => {
  const end = dayjs()
  const start = end.subtract(timeRangeToDays[past], 'day')

  return {
    start: start.format('YYYY-MM-DD'),
    end: end.format('YYYY-MM-DD'),
  }
}

const isValidEventsType = (type: string | null): boolean => {
  return Object.values(GetEventsTypeEnum).includes(type as GetEventsTypeEnum)
}

export const getValidEventsType = (
  searchParams: URLSearchParams,
): GetEventsTypeEnum => {
  const urlEventsType = searchParams.get('eventsType')

  return isValidEventsType(urlEventsType)
    ? (urlEventsType as GetEventsTypeEnum)
    : GetEventsTypeEnum.System
}

const DEFAULT_TIME_RANGE = '24h' satisfies ChartTimeRanges

const isChartTimeRange = (
  timeRange: string | null,
): timeRange is ChartTimeRanges => {
  return (
    timeRange !== null &&
    (chartTimeRanges as readonly string[]).includes(timeRange)
  )
}

export const getValidTimeRange = (
  searchParams: URLSearchParams,
): ChartTimeRanges => {
  const urlTimeRange = searchParams.get('past')
  return isChartTimeRange(urlTimeRange) ? urlTimeRange : DEFAULT_TIME_RANGE
}

export const getMatchedFilterByPrefix = (
  chartType: ChartType,
  filter: Record<string, string>,
) => {
  return Object.fromEntries(
    Object.entries(filter).filter(([key]) => key.startsWith(chartType)),
  )
}

export const mapToRedirectQuery = (
  currentQuery: Record<string, string>,
  chartType: ChartType,
): string => {
  const params = new URLSearchParams()
  Object.entries(currentQuery).forEach(([key, value]) => {
    params.set(removeQueryKeyPrefix(chartType, key), value)
  })
  return params.toString()
}
