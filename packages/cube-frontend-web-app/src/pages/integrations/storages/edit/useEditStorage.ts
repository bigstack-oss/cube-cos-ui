import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useCallback, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import {
  mockGetIntegrationsStorageDetailsApi,
  mockUpsertStorage,
} from '../mock'
import { ParsedStorageForm } from '../storageUtils'

export const useEditStorage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const navigate = useNavigate()
  const goBack = useCallback(
    () => navigate(CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE),
    [navigate],
  )

  const { name: storageName } = useParams()
  useEffect(() => {
    if (!storageName) {
      goBack()
    }
  }, [goBack, storageName])

  const { data: initialStorage, isLoading: isLoading } = useCosGetRequest(
    // @ts-expect-error: mockUpsertStorage is a mock function for testing purposes
    mockGetIntegrationsStorageDetailsApi,
    () => {
      if (!storageName) {
        return null
      }

      return {
        dataCenter: dataCenter!.name,
        name: storageName,
      }
    },
  )

  const { isLoading: isUpdating, mutateResource: updateStorageApi } =
    // @ts-expect-error: mockUpsertStorage is a mock function for testing purposes
    useCosMutationRequest(mockUpsertStorage)

  const updateStorage = async (parsedStorage: ParsedStorageForm) => {
    try {
      // @ts-expect-error: mockUpsertStorage is a mock function for testing purposes
      await updateStorageApi({
        dataCenter: dataCenter!.name,
        storage: parsedStorage,
      })
      goBack()
    } catch (error) {
      console.error('Update storage error: ', error)
    }
  }

  return {
    initialStorage,
    isLoading,
    isUpdating,
    updateStorage,
    cancel: goBack,
  }
}
