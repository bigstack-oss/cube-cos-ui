import { useContext } from 'react'
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { EditTriggers } from '@cube-frontend/web-app/components/UpsertTriggers/EditTriggers'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { triggersApi } from '@cube-frontend/web-app/api/cosApi'
import { TriggersApiGetTriggerRequest } from '@cube-frontend/api'
import { UpsertTriggersPayload } from '@cube-frontend/web-app/components/UpsertTriggers/upsertTriggersUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { payloadToUpdateRequest } from '../utils'

export const EditTriggersPage = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const triggerName = searchParams.get('name')

  const { dataCenter } = useContext(DataCenterContext)

  const { isLoading: isInitialDataLoading, data: initialData } =
    useCosGetRequest(triggersApi.getTrigger, () => {
      if (!triggerName) return null
      return {
        dataCenter: dataCenter!.name,
        triggerName,
      } satisfies TriggersApiGetTriggerRequest
    })

  const {
    isLoading: isPublishing,
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
      console.error('Edit trigger error: ', error)
    }
  }

  if (!triggerName) {
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
        isPublishing={isPublishing}
        isInitialDataLoading={isInitialDataLoading}
        initialData={initialData}
        errorMessage={errorState?.api?.msg || errorState?.native.message}
        onPublishClick={onPublishClick}
      />
    </div>
  )
}
