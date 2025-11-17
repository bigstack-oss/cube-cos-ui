import {
  GetIntegrationStorageResponseData,
  ListIntegrationStorageModelsResponseDataInner,
} from '@cube-frontend/api'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router'
import { DEFAULT_VENDOR_QUERY_KEY } from '../storageUtils'

export type VendorModels = Record<
  string,
  ListIntegrationStorageModelsResponseDataInner[]
>

export type UseVendorModel = {
  isLoading: boolean
  selectedModel: ListIntegrationStorageModelsResponseDataInner | undefined
  vendorOptions: string[]
  modelOptions: ListIntegrationStorageModelsResponseDataInner[]
  selectedVendor: string | undefined
  selectedModelName: string | undefined
  handleSelectedVendorChange: (vendor: string) => void
  handleSelectedModelNameChange: (modelName: string) => void
}

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

const getModelName = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  modelOptions: ListIntegrationStorageModelsResponseDataInner[],
) => {
  if (initialStorage) {
    return initialStorage.driver
  }

  if (modelOptions.length > 0) {
    return modelOptions[0].driver
  }

  return undefined
}

export const useVendorModel = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
): UseVendorModel => {
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

  const [selectedModelName, setSelectedModelName] = useState(() =>
    getModelName(initialStorage, []),
  )

  const handleSelectedVendorChange = (vendor: string) => {
    setSelectedVendor(vendor)
  }

  const handleSelectedModelNameChange = (modelName: string) => {
    setSelectedModelName(modelName)
  }

  const vendorModels = useMemo(
    () => (data ? groupModelsByVendor(data) : {}),
    [data],
  )

  const vendorOptions = useMemo(() => Object.keys(vendorModels), [vendorModels])

  const modelOptions = useMemo(
    () => (selectedVendor ? vendorModels[selectedVendor] || [] : []),
    [selectedVendor, vendorModels],
  )

  const selectedModel = useMemo(
    () => modelOptions?.find((m) => m.driver === selectedModelName),
    [modelOptions, selectedModelName],
  )

  useEffect(() => {
    setSelectedVendor(getVendor(initialStorage, vendorFromQuery))
  }, [vendorFromQuery, initialStorage])

  useEffect(() => {
    setSelectedModelName(getModelName(initialStorage, modelOptions))
  }, [initialStorage, modelOptions])

  return {
    isLoading,
    selectedModel,
    vendorOptions,
    modelOptions,
    selectedVendor,
    selectedModelName,
    handleSelectedVendorChange,
    handleSelectedModelNameChange,
  }
}
