import { useContext } from 'react'
import { Link, useNavigate } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { CreateTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/CreateTriggers'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { payloadToCreateRequest } from '../utils'

export const CreateTriggersPage = () => {
  const navigate = useNavigate()

  const { dataCenter } = useContext(DataCenterContext)

  const {
    isLoading: isPublishing,
    mutateResource: createTrigger,
    errorState,
    clearError,
  } = useCosMutationRequest(triggersApi.createTrigger)

  const onCreateClick = async (payload: UpsertTriggersPayload) => {
    clearError()

    try {
      const createTriggerRequest = payloadToCreateRequest(payload)
      await createTrigger({
        dataCenter: dataCenter!.name,
        createTriggerRequest,
      })
      navigate(CosRoutesEnum.EVENTS_TRIGGERS_PAGE)
    } catch (error) {
      console.error('Create trigger error: ', error)
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.EVENTS_TRIGGERS_PAGE,
          },
        }}
      >
        Create Triggers
      </CosBackButton>
      <CreateTriggers
        isPublishing={isPublishing}
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onCreateClick={onCreateClick}
      />
    </div>
  )
}
