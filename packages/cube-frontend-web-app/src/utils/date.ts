import { NodeLicense, NodeLicenseCurrentStatus } from '@cube-frontend/api'
import dayjs, { Dayjs } from 'dayjs'
import { TFunction } from 'i18next'

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
  t: TFunction<'translation', undefined>,
  options?: FormatLicenseDateOptions,
): string => {
  if (license.status.current === NodeLicenseCurrentStatus.Unlicense) {
    return t('home.overview.nodes.unlicense')
  }
  const { date } = license.expiry
  if (!date) {
    // `license.expiry.date` for nodes in powering on status will be empty string.
    return ''
  }
  return formatLicenseDate(date, options)
}

export const humanizeDuration = (
  t: TFunction<'translation', undefined>,
  durationSeconds: number,
) => {
  const duration = dayjs.duration(durationSeconds, 'seconds')

  if (duration.asDays() >= 1) {
    const value = Math.floor(duration.asDays())
    return `${value} ${t('home.overview.nodes.day', { count: value })}`
  }

  if (duration.asHours() >= 1) {
    const value = Math.floor(duration.asHours())
    return `${value} ${t('home.overview.nodes.hour', { count: value })}`
  }

  if (duration.asMinutes() >= 1) {
    const value = Math.floor(duration.asMinutes())
    return `${value} ${t('home.overview.nodes.minute', { count: value })}`
  }

  return `${durationSeconds} ${t('home.overview.nodes.second', { count: durationSeconds })}`
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
