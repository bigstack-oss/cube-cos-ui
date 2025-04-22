import { PropsWithChildren } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { dataCentersApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'

export const DataCenterProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { data: dataCenters, isLoading } = useCosGetRequest(
    dataCentersApi.getDataCenters,
  )

  const dataCenter = dataCenters?.[0]

  if (!isLoading && !dataCenter) {
    throw new Error('A data center is required.')
  }

  if (dataCenter) {
    dataCenter.additional.nodeLicenseStatus = {
      expired: 10,
      unlicense: 1,
      valid: 0,
    }
  }

  return (
    <DataCenterContext.Provider value={{ dataCenter, isLoading }}>
      {children}
    </DataCenterContext.Provider>
  )
}
