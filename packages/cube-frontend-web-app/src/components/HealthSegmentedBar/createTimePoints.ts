import { Dayjs, ManipulateType } from 'dayjs'
import { range } from 'lodash'

export type TimePoint = {
  dateTime: Dayjs
  /**
   * Milliseconds.
   */
  timestamp: number
  labels: string[]
}

export type CreateTimeOptions = {
  now: Dayjs
  iteration: number
  value: number
  unit: ManipulateType
  labelFormatters: string[]
}

export const createTimePoints = (options: CreateTimeOptions): TimePoint[] => {
  const { now, iteration, value, unit, labelFormatters } = options

  const timePoints: TimePoint[] = range(0, iteration)
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
