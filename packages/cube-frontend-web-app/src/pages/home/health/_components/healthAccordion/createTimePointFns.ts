import { Dayjs, ManipulateType } from 'dayjs'
import { TimeRange } from './healthAccordionUtils'

export type TimePoint = {
  dateTime: Dayjs
  /**
   * Milliseconds.
   */
  timestamp: number
  labels: string[]
}

type CreateTimeLabelOptions = {
  now: Dayjs
  iteration: number
  value: number
  unit: ManipulateType
  labelFormatters: string[]
}

const createTimePoints = (options: CreateTimeLabelOptions): TimePoint[] => {
  const { now, iteration, value, unit, labelFormatters } = options

  const timePoints: TimePoint[] = Array.from(Array(iteration).keys())
    .map((_, index) => {
      const dateTime = now.add((index + 1) * value, unit)
      return {
        dateTime,
        timestamp: dateTime.valueOf(),
        labels: labelFormatters.map((formatter) => dateTime.format(formatter)),
      } satisfies TimePoint
    })
    .reverse()

  timePoints.push({
    dateTime: now,
    timestamp: now.valueOf(),
    // TODO: Integrate 'NOW' with i18n.
    labels: ['NOW'],
  })

  return timePoints
}

export const createTimePointFns: Record<
  TimeRange,
  (now: Dayjs) => TimePoint[]
> = {
  last30Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -15,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last14Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -7,
      unit: 'days',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last7Days: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      // Use hours because DayJS only support integer values.
      value: -3.5 * 24,
      unit: 'hours',
      labelFormatters: ['MM/DD', 'HH:mm A'],
    }),
  last24Hours: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -12,
      unit: 'hours',
      labelFormatters: ['HH:mm A'],
    }),
  lastHour: (now) =>
    createTimePoints({
      now,
      iteration: 2,
      value: -30,
      unit: 'minutes',
      labelFormatters: ['HH:mm A'],
    }),
}
