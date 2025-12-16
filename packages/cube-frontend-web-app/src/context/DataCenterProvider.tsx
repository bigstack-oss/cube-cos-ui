import { PropsWithChildren, useMemo } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { dataCentersApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '../hooks/usePolling'
import { shouldDisplayLoading } from '../utils/loadingDisplay'

const POLLING_INTERVAL = 10 * 1000

export const DataCenterProvider = (props: PropsWithChildren) => {
  const { children } = props

  const {
    data: dataCenters,
    isLoading,
    getResource: fetchDataCenters,
    hasResponseBeenReceived,
  } = useCosGetRequest(dataCentersApi.getDataCenters)

  const { isPolling } = usePolling(fetchDataCenters, POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    isLoading,
    isPolling,
    hasResponseBeenReceived,
  })

  /**
   * In Phase 1, there is only 1 data center.
   */
  const dataCenter = dataCenters?.[0]
  if (!isLoading && dataCenters && !dataCenter) {
    throw new Error('A data center is required.')
  }

  const contextValue = useMemo(() => {
    return {
      dataCenter,
      fetchDataCenters,
      isLoading: showLoading,
    }
  }, [dataCenter, fetchDataCenters, showLoading])

  return (
    <DataCenterContext.Provider value={contextValue}>
      {children}
    </DataCenterContext.Provider>
  )
}
