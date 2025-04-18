import { GetHealthHistoryPastEnum } from '@cube-frontend/api'

export const timeRanges = [
  '30d',
  '14d',
  '7d',
  '24h',
  '1h',
] as const satisfies readonly GetHealthHistoryPastEnum[]

export type TimeRange = (typeof timeRanges)[number]

export const timeRangeLabels: Record<TimeRange, string> = {
  '30d': 'Last 30 days',
  '14d': 'Last 14 days',
  '7d': 'Last 7 days',
  '24h': 'Last 24 hours',
  '1h': 'Last hour',
}
