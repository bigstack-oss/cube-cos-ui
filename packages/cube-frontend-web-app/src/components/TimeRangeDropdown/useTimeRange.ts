import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

export type UseTimeRangeOption<T extends string, K extends string> = {
  defaultValue: T
  timeRangePastMap: Record<T, K>
}

export type UseTimeRange<T extends string, K extends string> = {
  now: Dayjs
  timeRange: T
  past: K
  onTimeRangeChange: (newTimeRange: T) => void
}

export const useTimeRange = <T extends string, K extends string>(
  option: UseTimeRangeOption<T, K>,
): UseTimeRange<T, K> => {
  const { defaultValue, timeRangePastMap } = option

  const { utcTimeZone } = useContext(DataCenterContext)

  const getNow = useCallback(() => {
    return dayjs.utc().utcOffset(utcTimeZone)
  }, [utcTimeZone])

  const [timeRange, setTimeRange] = useState<T>(defaultValue)

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow])

  const past = useMemo<K>(
    () => timeRangePastMap[timeRange],
    [timeRange, timeRangePastMap],
  )

  const onTimeRangeChange = (newTimeRange: T): void => {
    setTimeRange(newTimeRange)
  }

  return {
    now,
    timeRange,
    past,
    onTimeRangeChange,
  }
}
