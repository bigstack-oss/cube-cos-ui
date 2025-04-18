import { GetModuleHealthHistoryResponseDataHistoryInner } from '@cube-frontend/api'
import {
  createTimePoints,
  TimePoint,
} from '@cube-frontend/web-app/components/HealthSegmentedBar/createTimePoints'
import { Dayjs } from 'dayjs'
import { twMerge } from 'tailwind-merge'
import { HealthTimeRange } from '../healthTimeRangeUtils'

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

export const timePointFns: Record<
  HealthTimeRange,
  (now: Dayjs) => TimePoint[]
> = {
  '30d': (now) =>
    createTimePoints({
      now,
      iteration: 15,
      value: -2,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  '14d': (now) =>
    createTimePoints({
      now,
      iteration: 14,
      value: -1,
      unit: 'day',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  '7d': (now) =>
    createTimePoints({
      now,
      iteration: 14,
      value: -12,
      unit: 'hours',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  '24h': (now) =>
    createTimePoints({
      now,
      iteration: 12,
      value: -2,
      unit: 'hour',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
  '1h': (now) =>
    createTimePoints({
      now,
      iteration: 12,
      value: -5,
      unit: 'minutes',
      labelFormatters: ['MM/DD', 'HH:mm'],
    }),
}
