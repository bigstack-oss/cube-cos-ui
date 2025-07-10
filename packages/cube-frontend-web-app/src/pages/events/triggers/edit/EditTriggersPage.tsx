import { useContext } from 'react'
import { Link, Navigate, useNavigate } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { EditTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/EditTriggers'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useEditTriggersStore } from '@cube-frontend/web-app/stores/editTriggersStore'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { payloadToUpdateRequest } from '../utils'

export const EditTriggersPage = () => {
  const navigate = useNavigate()

  const initialData = useEditTriggersStore((store) => store.initialData)

  const { dataCenter } = useContext(DataCenterContext)

  const {
    mutateResource: updateTrigger,
    errorState,
    clearError,
  } = useCosMutationRequest(triggersApi.updateTrigger)

  const onPublishClick = async (payload: UpsertTriggersPayload) => {
    clearError()

    try {
      const updateTriggerRequest = payloadToUpdateRequest(payload)
      await updateTrigger({
        dataCenter: dataCenter!.name,
        triggerName: payload.name,
        updateTriggerRequest,
      })
      navigate(CosRoutesEnum.EVENTS_TRIGGERS_PAGE)
    } catch (error) {
      console.error('Create trigger error: ', error)
    }
  }

  if (!initialData) {
    // This happens when users access the edit triggers page by directly
    // entering the URL in the browser.
    return <Navigate to={CosRoutesEnum.EVENTS_TRIGGERS_PAGE} replace={true} />
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
        Edit Triggers
      </CosBackButton>
      <EditTriggers
        initialData={initialData}
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onPublishClick={onPublishClick}
      />
    </div>
  )
}
