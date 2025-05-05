import { NodeLicense, NodeLicenseCurrentStatus } from '@cube-frontend/api'
import { toPluralizeDisplay } from '@cube-frontend/utils'
import dayjs, { Dayjs } from 'dayjs'

export const formatEventTime = (date: string) => {
  return dayjs.respectTzOffset(date).format('YYYY/MM/DD HH:mm')
}

export const formatSupportFilesTimestamp = (date: string) => {
  return dayjs.respectTzOffset(date).format('YYYY/MM/DD HH:mm:ss')
}

export const formatPanelUpdateTime = (date: Dayjs) => {
  return date.format('YYYY/MM/DD HH:mm')
}

export const formatLicenseDate = (date: string) => {
  return dayjs.respectTzOffset(date).format('YYYY/MM/DD')
}

export const toLicenseExpirationDate = (
  license: Pick<NodeLicense, 'status' | 'expiry'>,
): string => {
  if (license.status.current === NodeLicenseCurrentStatus.Unlicense) {
    // TODO: i18n
    return 'Unlicense'
  }
  return formatLicenseDate(license.expiry.date)
}

export const humanizeDuration = (durationSeconds: number) => {
  const duration = dayjs.duration(durationSeconds, 'seconds')

  if (duration.asDays() >= 1) {
    const value = Math.floor(duration.asDays())
    return toPluralizeDisplay(value, 'day')
  }

  if (duration.asHours() >= 1) {
    const value = Math.floor(duration.asHours())
    return toPluralizeDisplay(value, 'hour')
  }

  if (duration.asMinutes() >= 1) {
    const value = Math.floor(duration.asMinutes())
    return toPluralizeDisplay(value, 'minute')
  }

  return durationSeconds
}

export const formatChartXAxisTime = (time: string) => {
  return dayjs.respectTzOffset(time).format('HH:mm')
}
