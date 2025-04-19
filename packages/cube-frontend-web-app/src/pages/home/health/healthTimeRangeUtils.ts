import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'

export const healthTimeRanges = [
  '30d',
  '14d',
  '7d',
  '24h',
  '1h',
] as const satisfies TimeRange[]

export type HealthTimeRange = (typeof healthTimeRanges)[number]
