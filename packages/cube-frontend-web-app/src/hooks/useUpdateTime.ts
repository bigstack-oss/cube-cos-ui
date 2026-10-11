import { useContext, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { DataCenterContext } from '../context/DataCenterContext'
import { formatPanelUpdateTime } from '../utils/date'

export const useUpdateTime = (data: unknown, isLoading: boolean) => {
  const { dataCenter } = useContext(DataCenterContext)
  const utcTimeZone = dataCenter?.utcTimeZone

  const [updateTime, setUpdateTime] = useState<string>()
  useEffect(() => {
    // Show the data center's wall clock, like the sidebar, not the browser's.
    const now = utcTimeZone ? dayjs.utc().utcOffset(utcTimeZone) : dayjs()
    setUpdateTime(formatPanelUpdateTime(now))
  }, [data, utcTimeZone])

  if (isLoading) {
    return null
  }

  return updateTime
}
