import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { GetRankedEventsPastEnum } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { TimeRange } from './timeRangeDropdownUtils'

export type UseTimeRange = {
  now: Dayjs
  timeRange: TimeRange
  past: GetRankedEventsPastEnum
  onTimeRangeChange: (newTimeRange: TimeRange) => void
}

const timeRangePastMap: Record<TimeRange, GetRankedEventsPastEnum> = {
  last14Days: '14d',
  last7Days: '7d',
  last24Hours: '24h',
  lastHour: '1h',
}

export const useTimeRange = (
  /**
   * @default 'last24Hours'
   */
  defaultTimeRange: TimeRange = 'last24Hours',
): UseTimeRange => {
  const { utcTimeZone } = useContext(DataCenterContext)

  const getNow = useCallback(() => {
    return dayjs.utc().utcOffset(utcTimeZone)
  }, [utcTimeZone])

  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange)

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow])

  const past = useMemo<GetRankedEventsPastEnum>(
    () => timeRangePastMap[timeRange],
    [timeRange],
  )

  const onTimeRangeChange = (newTimeRange: TimeRange): void => {
    setTimeRange(newTimeRange)
  }

  return {
    now,
    timeRange,
    past,
    onTimeRangeChange,
  }
}
