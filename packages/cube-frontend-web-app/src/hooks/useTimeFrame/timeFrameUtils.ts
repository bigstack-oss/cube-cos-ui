import { ManipulateType } from 'dayjs'

export const timeRanges = [
  'last30Days',
  'last14Days',
  'last7Days',
  'last24Hours',
  'lastHour',
] as const

export type TimeRange = (typeof timeRanges)[number]

type TimeDelta = {
  value: number
  unit: ManipulateType
}

export const timeRangeDelta: Record<TimeRange, TimeDelta> = {
  last30Days: {
    value: -30,
    unit: 'days',
  },
  last14Days: {
    value: -14,
    unit: 'days',
  },
  last7Days: {
    value: -7,
    unit: 'days',
  },
  last24Hours: {
    value: -24,
    unit: 'hours',
  },
  lastHour: {
    value: -1,
    unit: 'hour',
  },
}
