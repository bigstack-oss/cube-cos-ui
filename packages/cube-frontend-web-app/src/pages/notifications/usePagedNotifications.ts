import {
  GetNotificationsResponseData,
  NotificationsApiGetNotificationsRequest,
} from '@cube-frontend/api'
import { notificationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import { useContext } from 'react'
import { ListNotificationsQuery } from './notificationsPageUtils'

type UsePagedNotifications = {
  showLoading: boolean
  pagedNotifications: GetNotificationsResponseData | undefined
}

export const usePagedNotifications = (
  query: ListNotificationsQuery,
  debouncedKeyword: string,
): UsePagedNotifications => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading,
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

  const { isPolling } = usePolling(listNotifications, 5000)

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  return {
    showLoading,
    pagedNotifications,
  }
}
