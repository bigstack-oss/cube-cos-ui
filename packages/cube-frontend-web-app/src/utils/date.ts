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

type FormatLicenseDateOptions = {
  /**
   * Whether to include time (`HH:mm`) in the output.
   * @default false
   */
  includeTime?: boolean
}

export const formatLicenseDate = (
  date: string,
  options?: FormatLicenseDateOptions,
) => {
  const { includeTime = false } = options ?? {}
  const format = includeTime ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD'
  return dayjs.respectTzOffset(date).format(format)
}

export const toLicenseExpirationDate = (
  license: Pick<NodeLicense, 'status' | 'expiry'>,
  options?: FormatLicenseDateOptions,
): string => {
  if (license.status.current === NodeLicenseCurrentStatus.Unlicense) {
    // TODO: i18n
    return 'Unlicense'
  }
  const { date } = license.expiry
  if (!date) {
    // `license.expiry.date` for nodes in powering on status will be empty string.
    return ''
  }
  return formatLicenseDate(date, options)
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

  return toPluralizeDisplay(durationSeconds, 'second')
}

export const formatChartXAxisTime = (time: string) => {
  return dayjs.respectTzOffset(time).format('HH:mm')
}

export const transformDate = (value: string | null) => {
  if (!value) {
    return undefined
  }
  const date = dayjs(value)
  if (!date.isValid()) {
    return undefined
  }
  return date
}
