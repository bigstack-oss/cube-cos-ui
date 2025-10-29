import { ListIntegrationStorageModelsResponseDataInner } from '@cube-frontend/api'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext } from 'react'

export type VendorModels = Record<
  string,
  ListIntegrationStorageModelsResponseDataInner[]
>

const groupModelsByVendor = (
  models: ListIntegrationStorageModelsResponseDataInner[],
): VendorModels => {
  const vendorModelsMap: VendorModels = {}

  models.forEach((model) => {
    const vendor = model.vendor
    if (!vendorModelsMap[vendor]) {
      vendorModelsMap[vendor] = []
    }
    vendorModelsMap[vendor].push(model)
  })

  return vendorModelsMap
}

export const useVendorModel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.listIntegrationStorageModels,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const vendorModels = data ? groupModelsByVendor(data) : {}

  return {
    isLoading,
    vendorModels,
  }
}
