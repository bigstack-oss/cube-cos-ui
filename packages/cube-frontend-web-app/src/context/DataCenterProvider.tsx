import { PropsWithChildren } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { dataCentersApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'

export const DataCenterProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { data: dataCenters, isLoading } = useCosGetRequest(
    dataCentersApi.getDataCenters,
  )

  if (isLoading || !dataCenters) {
    return null
  }

  const dataCenter = dataCenters[0]
  if (!dataCenter) {
    return null
  }

  return (
    <DataCenterContext.Provider value={dataCenter}>
      {children}
    </DataCenterContext.Provider>
  )
}
