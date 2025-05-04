import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useCallback, useEffect, useState } from 'react'

dayjs.extend(utc)

/**
 * Returns the current time based on the provided timezone offset.
 * Falls back to local time if no timezone is provided.
 *
 * @param timeZone
 * - A string representing the time zone offset, in the format "+08:00" or "-05:00".
 *
 * @param updateInterval
 * - Time in milliseconds.
 * - Controls how frequently the hook recalculates the `now` time.
 */
export const useTimeZoneTime = (
  timeZone: string | undefined,
  updateInterval: number,
) => {
  const getNow = useCallback(() => {
    if (!timeZone) return dayjs()
    return dayjs.utc().utcOffset(timeZone)
  }, [timeZone])

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, updateInterval)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow, updateInterval])

  return now
}
