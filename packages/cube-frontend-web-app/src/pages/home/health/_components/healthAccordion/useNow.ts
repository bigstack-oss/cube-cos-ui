import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useRef, useState } from 'react'

const POLLING_INTERVAL = 5000

export const useNow = (): Dayjs => {
  const [now, setNow] = useState(() => dayjs(new Date()))
  const intervalId = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    intervalId.current = setInterval(() => {
      setNow(dayjs(new Date()))
    }, POLLING_INTERVAL)

    return () => {
      clearInterval(intervalId.current)
    }
  }, [])

  return now
}
