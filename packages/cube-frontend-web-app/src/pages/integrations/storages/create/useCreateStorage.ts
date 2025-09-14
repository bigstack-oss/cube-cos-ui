import { useContext } from 'react'
import { useNavigate } from 'react-router'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { StorageForm } from '../_components/upsert/storageFormUtils'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'

export const useCreateStorage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const navigate = useNavigate()
  const goBack = () => navigate(CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE)

  const { isLoading: isCreating, mutateResource: createStorageApi } =
    useCosMutationRequest(integrationsApi.createIntegrationStorage)

  const createStorage = async (storageForm: StorageForm) => {
    try {
      await createStorageApi({
        dataCenter: dataCenter!.name,
        applyIntegrationStorageRequest: storageForm,
      })
      goBack()
    } catch (error) {
      console.error('Create storage error: ', error)
    }
  }

  return {
    isCreating,
    createStorage,
    cancel: goBack,
  }
}
