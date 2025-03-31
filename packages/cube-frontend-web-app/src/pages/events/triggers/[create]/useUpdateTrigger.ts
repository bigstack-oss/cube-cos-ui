import { useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  GetTriggersResponseDataInner,
  TriggersApiUpdateTriggerRequest,
} from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import {
  CosApiResponse,
  CosRequestError,
} from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { formValueToRequest } from './utils'
import { CreateTriggerFormValue } from './useCreateTriggerForm'

type UseUpdateTriggerOption = {
  isFormValueValid: boolean
  formValue: CreateTriggerFormValue | undefined
  selectedTemplate: GetTriggersResponseDataInner | undefined
}

type UseUpdateTrigger = {
  isUpdating: boolean
  handleTriggerUpdate: () => Promise<void>
  errorState: CosRequestError | undefined
}

export const useUpdateTrigger = (
  option: UseUpdateTriggerOption,
): UseUpdateTrigger => {
  const { isFormValueValid, formValue, selectedTemplate } = option

  const navigate = useNavigate()

  const { name: dataCenter } = useContext(DataCenterContext)

  const {
    isLoading: isUpdating,
    mutateResource: updateTrigger,
    errorState,
    clearError,
  } = useCosMutationRequest(
    triggersApi.updateTrigger as (
      params: TriggersApiUpdateTriggerRequest,
    ) => Promise<CosApiResponse<undefined>>,
  )

  const handleTriggerUpdate = async () => {
    clearError()

    if (!dataCenter) {
      console.warn('No valid data center.')
      return
    }

    if (!selectedTemplate) {
      console.warn('Please select a trigger template.')
      return
    }

    if (!isFormValueValid || !formValue) {
      console.warn('Form value is not valid, please check again.')
      return
    }

    try {
      await updateTrigger({
        dataCenter,
        triggerName: selectedTemplate.name,
        updateTriggerRequest: formValueToRequest(formValue),
      })
      navigate('/events/triggers')
    } catch (error) {
      console.error('Update trigger error: ', error)
    }
  }

  return {
    isUpdating,
    handleTriggerUpdate,
    errorState,
  }
}
