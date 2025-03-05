import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import {
  createTimePoints,
  TimePoint,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { Dayjs } from 'dayjs'
import { twMerge } from 'tailwind-merge'

export type HistoryRow = GetModuleHealthHistoryResponseDataHistoryInner & {
  id: string
}

export const historyToTableRows = (
  history: GetModuleHealthHistoryResponseDataHistoryInner[],
): HistoryRow[] => {
  return history.map((entry) => ({
    ...entry,
    id: entry.time,
  }))
}

export const widthTransitionClasses = twMerge('transition-[width] duration-300')

export const timePointFns: Record<TimeRange, (now: Dayjs) => TimePoint[]> = {
  last30Days: (now) =>
    createTimePoints({
      now,
      iteration: 15,
      value: -2,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  last14Days: (now) =>
    createTimePoints({
      now,
      iteration: 14,
      value: -1,
      unit: 'day',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  last7Days: (now) =>
    createTimePoints({
      now,
      iteration: 14,
      value: -12,
      unit: 'hours',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  last24Hours: (now) =>
    createTimePoints({
      now,
      iteration: 12,
      value: -2,
      unit: 'hour',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  lastHour: (now) =>
    createTimePoints({
      now,
      iteration: 12,
      value: -5,
      unit: 'minutes',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
}
