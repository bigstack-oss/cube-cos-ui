import { NotificationsContext } from '@cube-frontend/web-app/context/NotificationsContext'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { useContext, useEffect } from 'react'

const UPDATE_INTERVAL = 3 * 1000

export const useUpdateLastAccessedAt = (isFetching: boolean): void => {
  const { updateLastAccessedAt } = useContext(NotificationsContext)

  const { startInterval, stopInterval } = useSequentialInterval(
    updateLastAccessedAt,
    UPDATE_INTERVAL,
    {
      immediate: false,
    },
  )

  // When the notifications are being fetched (either triggered by request param
  // changes or polling), a new API request is sent, and the response might include
  // unread notifications. If we don't stop the `accessedAt` updating interval in
  // this situation, those unread notifications could be marked as read immediately
  // after they appear, or even before the server responds if the timing is just right.
  useEffect(() => {
    if (isFetching) {
      // API still firing. Stop the updating interval.
      stopInterval()
    } else {
      // The server has responded. Resume the updating interval.
      startInterval()
    }
  }, [isFetching, startInterval, stopInterval])
}
