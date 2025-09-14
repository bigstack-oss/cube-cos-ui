import {
  GetIntegrationStorageResponseData,
  ListIntegrationStorageModelsResponseDataInner,
} from '@cube-frontend/api'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { DEFAULT_VENDOR_QUERY_KEY } from '../storageUtils'

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

const getVendor = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  vendorFromQuery: string | undefined,
): string | undefined => {
  return initialStorage?.vendor || vendorFromQuery
}

const getDriver = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  return initialStorage?.driver || undefined
}

export const useVendorModel = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
) => {
  const [searchParams] = useSearchParams()

  const vendorFromQuery =
    searchParams.get(DEFAULT_VENDOR_QUERY_KEY) || undefined

  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.listIntegrationStorageModels,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const [selectedVendor, setSelectedVendor] = useState(() =>
    getVendor(initialStorage, vendorFromQuery),
  )

  const [selectedModel, setSelectedModel] = useState(() =>
    getDriver(initialStorage),
  )

  useEffect(() => {
    setSelectedVendor(getVendor(initialStorage, vendorFromQuery))
  }, [vendorFromQuery, initialStorage])

  useEffect(() => {
    setSelectedModel(getDriver(initialStorage))
  }, [initialStorage])

  const vendorModels = data ? groupModelsByVendor(data) : {}
  const vendorOptions = Object.keys(vendorModels)
  const modelOptions = selectedVendor ? vendorModels[selectedVendor] || [] : []
  const baseModel = modelOptions?.find((m) => m.driver === selectedModel)

  return {
    isLoading,
    vendorOptions,
    modelOptions,
    selectedVendor,
    selectedModel,
    setSelectedVendor,
    setSelectedModel,
    baseModel,
  }
}
