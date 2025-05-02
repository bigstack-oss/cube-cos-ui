import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { useCallback, useEffect, useState } from 'react'

dayjs.extend(utc)

/**
 * Returns the current time based on the provided timezone offset (e.g. "+08:00").
 * Falls back to local time if no timezone is provided.
 */
export const useTimeZoneTime = (timeZone: string | undefined) => {
  const getNow = useCallback(() => {
    if (!timeZone) return dayjs()
    return dayjs.utc().utcOffset(timeZone)
  }, [timeZone])

  const [now, setNow] = useState(getNow)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(getNow)
    }, 5000)

    return () => {
      clearInterval(intervalId)
    }
  }, [getNow])

  return now
}
