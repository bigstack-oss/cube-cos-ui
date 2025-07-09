import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import { HealthTimeRange } from '../../healthTimeRangeUtils'
import { Dayjs } from 'dayjs'
import { useMemo } from 'react'
import { dateTimeRangeFns } from '../healthDetailsUtils'
import { HealthBrushTimeBar } from './HealthBrushTimeBar'
import { HealthZoomedTimeBar } from './HealthZoomedTimeBar'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'
import { filterChartHistory } from './utils'

const PADDING_X = 12

export type HealthTimeBarProps = {
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined
  now: Dayjs
  timeRange: HealthTimeRange
  brushDateTimeRange: DateTimeRange | null
  onBrushDateTimeRangeChange: (range: DateTimeRange | null) => void
}

export const HealthTimeBar = (props: HealthTimeBarProps) => {
  const {
    history,
    now,
    timeRange,
    brushDateTimeRange,
    onBrushDateTimeRangeChange,
  } = props

  const filteredHistory = useMemo(() => {
    return filterChartHistory(history, brushDateTimeRange)
  }, [history, brushDateTimeRange])

  const dateTimeRange = useMemo(() => {
    return dateTimeRangeFns[timeRange](now)
  }, [timeRange, now])

  return (
    <div className="flex w-full flex-col items-stretch justify-center gap-y-6">
      <HealthZoomedTimeBar
        paddingX={PADDING_X}
        history={filteredHistory}
        dateTimeRange={brushDateTimeRange ?? dateTimeRange}
      />
      <HealthBrushTimeBar
        paddingX={PADDING_X}
        history={history}
        dateTimeRange={dateTimeRange}
        brushDateTimeRange={brushDateTimeRange}
        onBrushDateTimeRangeChange={onBrushDateTimeRangeChange}
      />
    </div>
  )
}
