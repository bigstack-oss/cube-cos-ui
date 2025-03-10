import { GetHealthHistoryPastEnum } from '@cube-frontend/api'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
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
  const [timeRange, setTimeRange] = useState<TimeRange>('last24Hours')

  const [now, setNow] = useState(() => dayjs(new Date()))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(dayjs(new Date()))
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

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
