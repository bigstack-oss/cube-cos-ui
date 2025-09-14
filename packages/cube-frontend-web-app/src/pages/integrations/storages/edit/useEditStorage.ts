import { useCallback, useContext, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { StorageForm } from '../_components/upsert/storageFormUtils'
import { IntegrationsApiGetIntegrationStorageRequest } from '@cube-frontend/api'

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
    integrationsApi.getIntegrationStorage,
    () => {
      if (!storageName) {
        return null
      }

      return {
        dataCenter: dataCenter!.name,
        storageName,
      } satisfies IntegrationsApiGetIntegrationStorageRequest
    },
  )

  const { isLoading: isUpdating, mutateResource: updateStorageApi } =
    useCosMutationRequest(integrationsApi.updateIntegrationStorage)

  const updateStorage = async (storageForm: StorageForm) => {
    try {
      await updateStorageApi({
        dataCenter: dataCenter!.name,
        storageName: storageForm.name,
        applyIntegrationStorageRequest: storageForm,
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
