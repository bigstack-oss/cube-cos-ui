import { GetHealthHistoryPastEnum } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import dayjs, { Dayjs } from 'dayjs'
import { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { TimeRange } from './timeRangeDropdownUtils'

export type UseTimeRange = {
  now: Dayjs
  timeRange: TimeRange
  past: GetHealthHistoryPastEnum
  onTimeRangeChange: (newTimeRange: TimeRange) => void
}

const timeRangePastMap: Record<TimeRange, GetHealthHistoryPastEnum> = {
  last30Days: '30d',
  last14Days: '14d',
  last7Days: '7d',
  last24Hours: '24h',
  lastHour: '1h',
}

export const useTimeRange = (): UseTimeRange => {
  const { utcTimeZone } = useContext(DataCenterContext)

  const getNow = useCallback(() => {
    return dayjs.addTzOffset(new Date().toISOString(), utcTimeZone)
  }, [utcTimeZone])

  const [timeRange, setTimeRange] = useState<TimeRange>('last24Hours')

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow])

  const past = useMemo<GetHealthHistoryPastEnum>(
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
