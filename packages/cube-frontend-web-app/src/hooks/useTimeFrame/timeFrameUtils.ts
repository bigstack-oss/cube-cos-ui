import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'
import { ManipulateType } from 'dayjs'

type TimeDelta = {
  value: number
  unit: ManipulateType
}

export const timeRangeDelta: Record<TimeRange, TimeDelta> = {
  '30d': {
    value: -30,
    unit: 'days',
  },
  '14d': {
    value: -14,
    unit: 'days',
  },
  '7d': {
    value: -7,
    unit: 'days',
  },
  '24h': {
    value: -24,
    unit: 'hours',
  },
  '1h': {
    value: -1,
    unit: 'hour',
  },
}
