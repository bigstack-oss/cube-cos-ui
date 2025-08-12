import {
  GetNotificationsResponseData,
  NotificationsApiGetNotificationsRequest,
} from '@cube-frontend/api'
import { notificationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
import { useContext } from 'react'
import { ListNotificationsQuery } from './notificationsPageUtils'

type UsePagedNotifications = {
  isLoading: boolean
  pagedNotifications: GetNotificationsResponseData | undefined
}

export const usePagedNotifications = (
  query: ListNotificationsQuery,
  debouncedKeyword: string,
): UsePagedNotifications => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    hasResponseBeenReceived,
    data: pagedNotifications,
    getResource: listNotifications,
  } = useCosGetRequest(
    notificationsApi.getNotifications,
    (): NotificationsApiGetNotificationsRequest => ({
      dataCenter: dataCenter!.name,
      past: query.timeRange,
      keyword: debouncedKeyword,
      pageNum: query.currentPage,
      pageSize: query.itemsPerPage,
    }),
  )

  useSequentialInterval(listNotifications, 5000)

  return {
    isLoading: !hasResponseBeenReceived,
    pagedNotifications,
  }
}
