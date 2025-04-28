import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'

export const chartTimeRanges = [
  '1h',
  '24h',
  '7d',
  '14d',
] as const satisfies TimeRange[]

export type ChartTimeRanges = (typeof chartTimeRanges)[number]

export const DEFAULT_TIME_RANGE = '24h' satisfies ChartTimeRanges

export const isChartTimeRange = (value: string): value is ChartTimeRanges => {
  return ['1h', '24h', '7d', '14d'].includes(value)
}

export const getValidTimeRange = (past: string): ChartTimeRanges => {
  if (!past) return DEFAULT_TIME_RANGE

  if (isChartTimeRange(past)) {
    return past
  }

  return DEFAULT_TIME_RANGE
}
