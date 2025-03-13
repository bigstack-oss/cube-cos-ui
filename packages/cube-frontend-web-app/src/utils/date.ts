import { toUnitDisplay } from '@cube-frontend/utils'
import dayjs, { Dayjs } from 'dayjs'

export const formatEventTime = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD HH:mm')
}

export const formatPanelUpdateTime = (date: Dayjs) => {
  return date.format('YYYY/MM/DD HH:mm')
}

export const toLicenseDateDisplay = (date: string) => {
  return dayjs(date).format('YYYY/MM/DD')
}

export const humanizeDuration = (durationSeconds: number) => {
  const duration = dayjs.duration(durationSeconds, 'seconds')

  if (duration.asDays() >= 1) {
    const value = Math.floor(duration.asDays())
    return toUnitDisplay(value, 'day')
  }

  if (duration.asHours() >= 1) {
    const value = Math.floor(duration.asHours())
    return toUnitDisplay(value, 'hour')
  }

  if (duration.asMinutes() >= 1) {
    const value = Math.floor(duration.asMinutes())
    return toUnitDisplay(value, 'minute')
  }

  return durationSeconds
}
