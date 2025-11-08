import { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosStroke } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { EventsApiGetPredefinedEventsRequest } from '@cube-frontend/api'
import { useStepParam } from './_components/useStepParam'
import { useCreateTriggersPayload } from './useCreateTriggersPayload'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'
import {
  isEventsValid,
  isResponseValid,
  shouldRedirectToListPage,
  UpsertTriggersPayload,
  UpsertTriggersStep,
} from './upsertTriggersUtils'
import { useTriggerMaterials } from './useTriggerMaterials'

type CreateTriggersProps = {
  isPublishing: boolean
  errorMessage?: string | undefined
  onCreateClick: (payload: UpsertTriggersPayload) => Promise<void>
}

export const CreateTriggers = (props: CreateTriggersProps) => {
  const { isPublishing, errorMessage, onCreateClick } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const { step, goToSetResponse, goToAddDescription } = useStepParam([
    UpsertTriggersStep.SelectEvents,
    UpsertTriggersStep.SetResponse,
    UpsertTriggersStep.AddDescription,
  ])

  const {
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onScriptChange,
    onScriptRemove,
    onNameChange,
    onDescriptionChange,
    onEventsReset,
    onResponseReset,
  } = useCreateTriggersPayload()

  const { isMaterialsLoading, materials } = useTriggerMaterials()

  const { isLoading: isMatchingEventsLoading, data: matchingEvents } =
    useCosGetRequest(
      eventsApi.getPredefinedEvents,
      () => {
        if (!payload) return null

        return {
          dataCenter: dataCenter!.name,
          types: payload.alertTypes,
          severities: payload.severities,
          categories: payload.categories,
          ids: payload.eventIds,
        } satisfies EventsApiGetPredefinedEventsRequest
      },
      {
        fetchOnMount: false,
      },
    )

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isInitialDataLoading={false}
        isMatchingEventsLoading={isMatchingEventsLoading}
        isMaterialsLoading={isMaterialsLoading}
        isAttributeChanged={isEventsValid(payload)}
        payload={payload}
        attribute={materials.attribute}
        matchingEvents={matchingEvents ?? []}
        onAlertTypeSelect={onAlertTypeSelect}
        onSeveritySelect={onSeveritySelect}
        onCategorySelect={onCategorySelect}
        onEventIdSelect={onEventIdSelect}
        onNextClick={goToSetResponse}
        onResetClick={onEventsReset}
      />
    ),
    setResponse: () => (
      <SetResponse
        isLoading={false}
        isResponseChanged={isResponseValid(payload)}
        payload={payload}
        response={materials.response}
        onEmailSelect={onEmailSelect}
        onSlackSelect={onSlackSelect}
        onScriptChange={onScriptChange}
        onScriptRemove={onScriptRemove}
        onNextClick={goToAddDescription}
        onResetClick={onResponseReset}
      />
    ),
    addDescription: () => (
      <AddDescription
        isLoading={false}
        isPublishing={isPublishing}
        nextButtonText={t('events.triggers.upsert.create')}
        payload={payload}
        errorMessage={errorMessage}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onPublishClick={onCreateClick}
      />
    ),
  }

  const renderContent = renderContentFnMap[step]

  if (shouldRedirectToListPage(step, payload)) {
    // This happens when users skip the first step by directly entering
    // the URL in the browser.
    return <Navigate to={CosRoutesEnum.EVENTS_TRIGGERS_PAGE} replace={true} />
  }

  return (
    <div className="flex flex-col gap-4">
      <UpsertTriggersSteps step={step} />
      <CosStroke />
      {renderContent()}
    </div>
  )
}
