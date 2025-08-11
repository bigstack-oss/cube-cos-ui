import { DataCenter } from '@cube-frontend/api'
import dayjs from 'dayjs'

export const computeLastNotificationTimeLocalStorageKey = (
  username: string,
  dataCenterName: string,
): string => {
  return `${username}-${dataCenterName}-last-notification-time`
}

const getLastNotificationTime = (
  username: string,
  dataCenterName: string,
): dayjs.Dayjs | null => {
  const key = computeLastNotificationTimeLocalStorageKey(
    username,
    dataCenterName,
  )
  const time = localStorage.getItem(key) ?? ''
  if (!time) return null

  const dateTime = dayjs.respectTzOffset(time)
  if (!dateTime.isValid()) return null

  return dateTime
}

export const computeStartFrom = (
  username: string,
  dataCenter: DataCenter,
): string => {
  const lastNotificationTime = getLastNotificationTime(
    username,
    dataCenter.name,
  )
  const now = dayjs.utc().utcOffset(dataCenter.utcTimeZone)

  if (!lastNotificationTime || now.diff(lastNotificationTime, 'hours') > 6) {
    // Only show notifications from the past 6 hours.
    return now.subtract(6, 'hours').format()
  }

  // Add 1 second to avoid the last notification from being returned by the API again.
  return lastNotificationTime.add(1, 'second').format()
}
