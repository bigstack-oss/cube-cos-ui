import { PropsWithChildren, useEffect, useState } from 'react'
import { dataCentersApi, GetDataCentersResponse } from '@cube-frontend/api'
import { DataCenterContext } from './DataCenterContext'

export const DataCenterProvider = (props: PropsWithChildren) => {
  const { children } = props

  const [isLoading, setIsLoading] = useState(true)
  const [dataCenters, setDataCenters] = useState<
    GetDataCentersResponse['data'] | undefined
  >()

  useEffect(() => {
    dataCentersApi.getDataCenters().then((dataCentersResponse) => {
      setDataCenters(dataCentersResponse.data.data)
      setIsLoading(false)
    })
  }, [])

  if (isLoading || !dataCenters) {
    return null
  }

  const dataCenter = dataCenters[0]
  if (!dataCenter) {
    return null
  }

  return (
    // <DataCenterContext.Provider value={{ dataCenter, isLoading }}>
    <DataCenterContext.Provider value={dataCenter}>
      {children}
    </DataCenterContext.Provider>
  )
}
