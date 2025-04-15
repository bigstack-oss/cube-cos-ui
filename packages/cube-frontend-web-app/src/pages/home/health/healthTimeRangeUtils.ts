import { GetHealthHistoryPastEnum } from '@cube-frontend/api'

export const timeRanges = [
  'last30Days',
  'last14Days',
  'last7Days',
  'last24Hours',
  'lastHour',
] as const

export type TimeRange = (typeof timeRanges)[number]

export const timeRangePastMap: Record<TimeRange, GetHealthHistoryPastEnum> = {
  last30Days: '30d',
  last14Days: '14d',
  last7Days: '7d',
  last24Hours: '24h',
  lastHour: '1h',
}

export const timeRangeLabels: Record<TimeRange, string> = {
  last30Days: 'Last 30 days',
  last14Days: 'Last 14 days',
  last7Days: 'Last 7 days',
  last24Hours: 'Last 24 hours',
  lastHour: 'Last hour',
}
