import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { formatPanelUpdateTime } from '../utils/date'

export const useUpdateTime = (data: unknown, isLoading: boolean) => {
  const [updateTime, setUpdateTime] = useState<string>()
  useEffect(() => {
    const now = dayjs()
    setUpdateTime(formatPanelUpdateTime(now))
  }, [data])

  if (isLoading) {
    return null
  }

  return updateTime
}
