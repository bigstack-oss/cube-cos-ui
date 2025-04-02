import { useContext } from 'react'
import { useNavigate } from 'react-router'
import {
  GetTriggersResponseDataInnerAttributes,
  TriggersApiUpdateTriggerRequest,
  UpdateTriggerRequestResponseEmailsInner,
  UpdateTriggerRequestResponseSlacksInner,
} from '@cube-frontend/api'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import {
  CosApiResponse,
  CosRequestError,
} from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'

type UseUpdateTriggerOption = {
  isValid: boolean
  enabled: boolean
  attributes: GetTriggersResponseDataInnerAttributes[]
  selectedTemplateName: string | null
  selectedEmails: string[]
  selectedSlacks: string[]
}

type UseUpdateTrigger = {
  isUpdateLoading: boolean
  handleTriggerUpdate: () => Promise<void>
  errorState: CosRequestError | undefined
}

export const useUpdateTrigger = (
  option: UseUpdateTriggerOption,
): UseUpdateTrigger => {
  const {
    isValid,
    enabled,
    attributes,
    selectedTemplateName,
    selectedEmails,
    selectedSlacks,
  } = option

  const navigate = useNavigate()

  const { name: dataCenter } = useContext(DataCenterContext)

  const {
    isLoading: isUpdateLoading,
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

    try {
      if (!dataCenter || !selectedTemplateName || !isValid) return

      await updateTrigger({
        dataCenter,
        triggerName: selectedTemplateName,
        updateTriggerRequest: {
          attributes: attributes.map(
            ({ name, type, value, enabled }) =>
              ({
                name,
                type,
                value,
                enabled,
              }) satisfies GetTriggersResponseDataInnerAttributes,
          ),
          response: {
            slacks: selectedSlacks.map(
              (url) =>
                ({ url }) satisfies UpdateTriggerRequestResponseSlacksInner,
            ),
            emails: selectedEmails.map(
              (address) =>
                ({
                  address,
                }) satisfies UpdateTriggerRequestResponseEmailsInner,
            ),
          },
          enabled,
        },
      })
      navigate('/events/triggers')
    } catch (error) {
      console.error('Update trigger error: ', error)
    }
  }

  return {
    isUpdateLoading,
    handleTriggerUpdate,
    errorState,
  }
}
