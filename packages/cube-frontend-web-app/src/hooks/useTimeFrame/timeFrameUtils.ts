import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { ManipulateType } from 'dayjs'

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
