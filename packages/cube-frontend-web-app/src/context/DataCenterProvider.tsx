import { PropsWithChildren, useMemo } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { dataCentersApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'

export const DataCenterProvider = (props: PropsWithChildren) => {
  const { children } = props

  const {
    data: dataCenters,
    isLoading,
    getResource: fetchDataCenters,
  } = useCosGetRequest(dataCentersApi.getDataCenters)

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
      isLoading,
    }
  }, [dataCenter, fetchDataCenters, isLoading])

  return (
    <DataCenterContext.Provider value={contextValue}>
      {children}
    </DataCenterContext.Provider>
  )
}
