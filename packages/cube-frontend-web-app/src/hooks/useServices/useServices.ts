import {
  GetHealthHistoryModuleTypeEnum,
  GetHealthHistoryServiceTypeEnum,
  GetServicesResponseDataInner,
  ServicesApiGetServicesRequest,
} from '@cube-frontend/api'
import { servicesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCallback, useContext } from 'react'
import { useCosGetRequest } from '../useCosRequest/useCosGetRequest'

export type UseServices = {
  services: GetServicesResponseDataInner[]
  isLoadingServices: boolean
  findModule: (name: string) => ModuleMetadata | undefined
}

export type ModuleMetadata = {
  service: GetHealthHistoryServiceTypeEnum
  name: GetHealthHistoryModuleTypeEnum
}

export const useServices = (): UseServices => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { data: services = [], isLoading } = useCosGetRequest(
    servicesApi.getServices,
    () =>
      ({
        dataCenter,
      }) satisfies ServicesApiGetServicesRequest,
  )

  const findModule = useCallback(
    (name: string): ModuleMetadata | undefined => {
      let module: ModuleMetadata | undefined = undefined

      for (const service of services) {
        if (service.modules.some((moduleData) => moduleData.name === name)) {
          module = {
            service: service.name as GetHealthHistoryServiceTypeEnum,
            name: name as GetHealthHistoryModuleTypeEnum,
          }
        }
      }

      return module
    },
    [services],
  )

  return {
    services,
    isLoadingServices: isLoading,
    findModule,
  }
}
