import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useContext, useEffect, useState } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { TimeRange } from './timeRangeUtils'

export type UseTimeRangeOption<T extends readonly TimeRange[]> = {
  includes: T
  defaultValue: T[number]
}

export type UseTimeRange<T extends readonly TimeRange[]> = {
  now: Dayjs
  timeRange: T[number]
  onTimeRangeChange: (newTimeRange: T[number]) => void
}

export const useTimeRange = <T extends readonly TimeRange[]>(
  option: UseTimeRangeOption<T>,
): UseTimeRange<T> => {
  const { defaultValue } = option

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
    timeRange,
    onTimeRangeChange,
  }
}
