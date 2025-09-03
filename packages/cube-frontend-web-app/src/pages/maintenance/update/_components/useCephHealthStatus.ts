import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  HealthApiGetHealthsRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useMemo } from 'react'

export type CephHealthStatus =
  | GetHealthsResponseDataOverallStatusCurrentEnum
  | 'checking'

export const useCephHealthStatus = (): CephHealthStatus => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: healthsData, hasResponseBeenReceived } = useCosGetRequest(
    healthApi.getHealths,
    (): HealthApiGetHealthsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const cephModule = useMemo(() => {
    const storageService = healthsData?.services.find(
      (service) => service.name === 'storage',
    )
    const cephModule = storageService?.modules.find(
      (module) => module.name === 'ceph',
    )
    return cephModule
  }, [healthsData?.services])

  if (!hasResponseBeenReceived) return 'checking'

  return (
    cephModule?.status.current ??
    GetHealthsResponseDataOverallStatusCurrentEnum.Ng
  )
}
