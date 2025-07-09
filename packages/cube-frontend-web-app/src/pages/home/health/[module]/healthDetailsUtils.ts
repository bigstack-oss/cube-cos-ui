import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import dayjs, { Dayjs } from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { HealthTimeRange } from '../healthTimeRangeUtils'
import { DateTimeRange } from '@cube-frontend/web-app/components/HealthSegmentedBar/BrushFilter'

export type HistoryRow = GetModuleHealthHistoryResponseDataHistoryInner & {
  id: string
}

export const historyToTableRows = (
  history: GetModuleHealthHistoryResponseDataHistoryInner[],
): HistoryRow[] => {
  return history.map((entry) => ({
    ...entry,
    id: `${entry.time} + ${entry.hostname}`,
  }))
}

export const filterHistory = (
  history: GetModuleHealthHistoryResponseDataHistoryInner[] | undefined,
  brushTimeRange: DateTimeRange | null,
): GetModuleHealthHistoryResponseDataHistoryInner[] => {
  if (!history) return []
  if (!brushTimeRange) return history

  const [start, end] = brushTimeRange
  return history.filter((entry) => {
    const entryTime = dayjs.respectTzOffset(entry.time)
    return entryTime.isBetween(start, end, 'seconds', '[]')
  })
}

export const widthTransitionClasses = twMerge('transition-[width] duration-300')

export const dateTimeRangeFns: Record<
  HealthTimeRange,
  (now: Dayjs) => DateTimeRange
> = {
  '30d': (now) => [now.subtract(30, 'day'), now],
  '14d': (now) => [now.subtract(14, 'day'), now],
  '7d': (now) => [now.subtract(7, 'day'), now],
  '24h': (now) => [now.subtract(24, 'hour'), now],
  '1h': (now) => [now.subtract(1, 'hour'), now],
}
