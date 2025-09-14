import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'

export const useStorageVendors = () => {
  const { dataCenter } = useContext(DataCenterContext)

  return useCosGetRequest(
    integrationsApi.listIntegrationStorageVendors,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )
}
