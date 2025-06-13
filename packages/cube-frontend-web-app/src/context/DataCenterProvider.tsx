import { PropsWithChildren } from 'react'
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

  if (!isLoading && !dataCenter) {
    throw new Error('A data center is required.')
  }

  return (
    <DataCenterContext.Provider
      value={{ dataCenter, fetchDataCenters, isLoading }}
    >
      {children}
    </DataCenterContext.Provider>
  )
}
