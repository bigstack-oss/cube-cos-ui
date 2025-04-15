import { GetRankedEventsPastEnum } from '@cube-frontend/api'

export const timeRanges = [
  'last14Days',
  'last7Days',
  'last24Hours',
  'lastHour',
] as const

export type TimeRange = (typeof timeRanges)[number]

export const timeRangeLabels: Record<TimeRange, string> = {
  last14Days: 'Last 14 days',
  last7Days: 'Last 7 days',
  last24Hours: 'Last 24 hours',
  lastHour: 'Last hour',
}

export const timeRangePastMap: Record<TimeRange, GetRankedEventsPastEnum> = {
  last14Days: '14d',
  last7Days: '7d',
  last24Hours: '24h',
  lastHour: '1h',
}
