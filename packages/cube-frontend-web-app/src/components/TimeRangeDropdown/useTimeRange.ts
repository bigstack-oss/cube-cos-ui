import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useContext, useEffect, useState } from 'react'
import { TimeRange } from './timeRangeUtils'

export type UseTimeRangeOption<T extends readonly TimeRange[]> = {
  includes: T
  defaultValue: T[number]
}

export type UseTimeRange<T extends readonly TimeRange[]> = {
  now: Dayjs
  /**
   * The same `includes` array from the options.
   * Exposed it just to make type inference and usage easier.
   */
  timeRanges: T
  timeRange: T[number]
  onTimeRangeChange: (newTimeRange: T[number]) => void
}

export const useTimeRange = <T extends readonly TimeRange[]>(
  option: UseTimeRangeOption<T>,
): UseTimeRange<T> => {
  const { includes, defaultValue } = option

  const { utcTimeZone } = useContext(DataCenterContext)

  const getNow = useCallback(() => {
    return dayjs.utc().utcOffset(utcTimeZone)
  }, [utcTimeZone])

  const [timeRange, setTimeRange] = useState<TimeRange>(defaultValue)

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow])

  const onTimeRangeChange = (newTimeRange: T[number]): void => {
    setTimeRange(newTimeRange)
  }

  return {
    now,
    timeRanges: includes,
    timeRange,
    onTimeRangeChange,
  }
}
