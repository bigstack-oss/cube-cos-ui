import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useContext, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router'
import { mockUpsertStorage } from '../mock'
import {
  DEFAULT_VENDOR_QUERY_KEY,
  ParsedStorageForm,
  StorageForm,
} from '../storageUtils'
import { VendorModels } from './useVendorModel'

const getDefaultVendor = (
  vendorModels: VendorModels | undefined,
  defaultVendorQuery: string | undefined,
): string => {
  if (!vendorModels || !defaultVendorQuery) return ''
  const vendor = Object.keys(vendorModels).find((v) => v === defaultVendorQuery)
  return vendor || ''
}

export const useCreateStorage = (vendors: VendorModels | undefined) => {
  const [searchParams] = useSearchParams()
  const { dataCenter } = useContext(DataCenterContext)

  const navigate = useNavigate()
  const goBack = () => navigate(CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE)

  const { isLoading: isCreating, mutateResource: createStorageApi } =
    // @ts-expect-error: mockUpsertStorage is a mock function for testing purposes
    useCosMutationRequest(mockUpsertStorage)

  const defaultVendorQuery =
    searchParams.get(DEFAULT_VENDOR_QUERY_KEY) || undefined
  const initialStorage = useMemo<Partial<StorageForm>>(() => {
    return { vendor: getDefaultVendor(vendors, defaultVendorQuery) }
  }, [defaultVendorQuery, vendors])

  const createStorage = async (parsedStorage: ParsedStorageForm) => {
    try {
      // @ts-expect-error: mockUpsertStorage is a mock function for testing purposes
      await createStorageApi({
        dataCenter: dataCenter!.name,
        storage: parsedStorage,
      })
      goBack()
    } catch (error) {
      console.error('Create storage error: ', error)
    }
  }

  return {
    isCreating,
    initialStorage,
    createStorage,
    cancel: goBack,
  }
}
