import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { timeRangeDelta } from './timeFrameUtils'

export type UseTimeFrame = {
  now: Dayjs
  past: Dayjs
  timeRange: TimeRange
  onTimeRangeChange: (timeRange: TimeRange) => void
}

export type UseTimeFrameOptions = {
  /**
   * @default 'last24Hours'
   */
  defaultTimeRange?: TimeRange
}

const UPDATE_INTERVAL = 5000

export const useTimeFrame = (options?: UseTimeFrameOptions): UseTimeFrame => {
  const { defaultTimeRange = 'last24Hours' } = options ?? {}

  const [now, setNow] = useState<Dayjs>(() => dayjs(new Date()))
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)

  const past = useMemo<Dayjs>(() => {
    const delta = timeRangeDelta[timeRange]
    return now.add(delta.value, delta.unit)
  }, [now, timeRange])

  const onTimeRangeChange = (nextTimeRange: TimeRange): void => {
    setTimeRange(nextTimeRange)
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(dayjs(new Date()))
    }, UPDATE_INTERVAL)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return {
    now,
    past,
    timeRange,
    onTimeRangeChange,
  }
}
