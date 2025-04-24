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

/**
 * This hook has a dependency on the data center.
 * Do not use it outside of `<Content>`.
 */
export const useTimeRange = <T extends readonly TimeRange[]>(
  option: UseTimeRangeOption<T>,
): UseTimeRange<T> => {
  const { includes, defaultValue } = option

  const { dataCenter } = useContext(DataCenterContext)

  const getNow = useCallback(() => {
    return dayjs.utc().utcOffset(dataCenter!.utcTimeZone)
  }, [dataCenter])

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
