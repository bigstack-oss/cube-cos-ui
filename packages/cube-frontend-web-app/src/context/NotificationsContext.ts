import { createContext } from 'react'

export type NotificationsContextValue = {
  /**
   * The timestamp of the last time notifications page was accessed.
   */
  lastAccessedAt: number
  /**
   * Update the `accessedAt` timestamp to the current time.
   */
  updateLastAccessedAt: () => void
}

export const NotificationsContext = createContext<NotificationsContextValue>({
  lastAccessedAt: 0,
  updateLastAccessedAt: () => {},
})
