import {
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { DataCenterContext } from './DataCenterContext'
import {
  NotificationsContext,
  NotificationsContextValue,
} from './NotificationsContext'
import { UserContext } from './UserContext'

const getLastAccessedAt = (storageKey: string): number => {
  const stringifiedValue = localStorage.getItem(storageKey)
  if (!stringifiedValue) return 0

  const lastAccessedAt = parseInt(stringifiedValue, 10)
  if (isNaN(lastAccessedAt) || lastAccessedAt < 0) return 0

  return lastAccessedAt
}

const computeAccessedAtStorageKey = (
  username: string | undefined,
  dataCenterName: string | undefined,
): string => {
  if (!username || !dataCenterName) return ''
  return `${username}-${dataCenterName}-notifications-last-accessed-at`
}

export const NotificationsContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { dataCenter } = useContext(DataCenterContext)
  const { userInfo } = useContext(UserContext)

  const storageKey = computeAccessedAtStorageKey(
    userInfo?.name,
    dataCenter?.name,
  )

  const [lastAccessedAt, setLastAccessedAt] = useState<number>(() =>
    getLastAccessedAt(storageKey),
  )

  useEffect(() => {
    setLastAccessedAt(getLastAccessedAt(storageKey))
  }, [storageKey])

  const updateLastAccessedAt = useCallback((): void => {
    const now = Date.now()
    localStorage.setItem(storageKey, now.toString())
    setLastAccessedAt(now)
  }, [storageKey])

  const contextValue: NotificationsContextValue = useMemo(
    () => ({
      lastAccessedAt,
      updateLastAccessedAt,
    }),
    [lastAccessedAt, updateLastAccessedAt],
  )

  return (
    <NotificationsContext.Provider value={contextValue}>
      {children}
    </NotificationsContext.Provider>
  )
}
