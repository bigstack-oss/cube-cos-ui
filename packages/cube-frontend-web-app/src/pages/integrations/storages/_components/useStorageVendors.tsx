import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { mockFetchStorageMaterials } from '../mock'
import { useContext } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'

export const useStorageVendors = () => {
  const { dataCenter } = useContext(DataCenterContext)

  // @ts-expect-error - Temporarily using mock data until backend API is ready
  return useCosGetRequest(mockFetchStorageMaterials, () => ({
    dataCenter: dataCenter!.name,
  }))
}
