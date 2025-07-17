import { ReactNode, useContext } from 'react'
import { every, isEqual, noop } from 'lodash'
import { Navigate } from 'react-router'
import { CosStroke } from '@cube-frontend/ui-library'
import {
  EventsApiGetPredefinedEventsRequest,
  Trigger,
} from '@cube-frontend/api'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useStepParam } from './_components/useStepParam'
import { useEditTriggersPayload } from './useEditTriggersPayload'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'
import {
  UpsertTriggersPayload,
  UpsertTriggersStep,
} from './upsertTriggersUtils'
import { useTriggerMaterials } from './useTriggerMaterials'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

type EditTriggersProps = {
  isPublishing: boolean
  isInitialDataLoading: boolean
  initialData: Trigger | undefined
  errorMessage?: string | undefined
  onPublishClick: (payload: UpsertTriggersPayload) => Promise<void>
}

export const EditTriggers = (props: EditTriggersProps) => {
  const {
    isPublishing,
    isInitialDataLoading,
    initialData,
    errorMessage,
    onPublishClick,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

  const { step, goToSetResponse, goToAddDescription } = useStepParam([
    UpsertTriggersStep.SelectEvents,
    UpsertTriggersStep.SetResponse,
    UpsertTriggersStep.AddDescription,
  ])

  const { isMaterialsLoading, materials } = useTriggerMaterials()

  const editTriggers = useEditTriggersPayload(initialData)

  const { isLoading: isMatchingEventsLoading, data: matchingEvents } =
    useCosGetRequest(eventsApi.getPredefinedEvents, () => {
      const payload = editTriggers?.payload

      if (!payload) return null

      return {
        dataCenter: dataCenter!.name,
        types: payload.alertTypes,
        severities: payload.severities,
        categories: payload.categories,
        ids: payload.eventIds,
      } satisfies EventsApiGetPredefinedEventsRequest
    })

  if (isInitialDataLoading) {
    return (
      <SelectEvents
        isBuiltIn={initialData?.isBuiltIn}
        isInitialDataLoading={isInitialDataLoading}
        isMatchingEventsLoading={isMatchingEventsLoading}
        isMaterialsLoading={isMaterialsLoading}
        isAttributeChanged={false}
        payload={undefined}
        attribute={materials.attribute}
        matchingEvents={[]}
        onAlertTypeSelect={noop}
        onSeveritySelect={noop}
        onCategorySelect={noop}
        onEventIdSelect={noop}
        onNextClick={noop}
        onResetClick={noop}
      />
    )
  }

  if (!isInitialDataLoading && !initialData)
    return <Navigate to={CosRoutesEnum.EVENTS_TRIGGERS_PAGE} replace={true} />

  if (!editTriggers) return

  const {
    payload: confirmedPayload,
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
  } = editTriggers

  const isAttributeChanged = !every([
    isEqual(initialData?.attribute.alertTypes, confirmedPayload.alertTypes),
    isEqual(initialData?.attribute.severities, confirmedPayload.severities),
    isEqual(initialData?.attribute.categories, confirmedPayload.categories),
    isEqual(initialData?.attribute.eventIds, confirmedPayload.eventIds),
  ])

  const isResponseChanged = (): boolean => {
    const initialScriptContent = btoa(
      initialData?.response.script.content ?? '',
    )

    return !(
      initialData?.response.script.name === confirmedPayload.script?.name &&
      initialScriptContent === confirmedPayload.script?.content &&
      isEqual(initialData?.response.emails, confirmedPayload.emails) &&
      isEqual(initialData?.response.slacks, confirmedPayload.slacks)
    )
  }

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isBuiltIn={initialData?.isBuiltIn}
        isInitialDataLoading={isInitialDataLoading}
        isMatchingEventsLoading={isMatchingEventsLoading}
        isMaterialsLoading={isMaterialsLoading}
        isAttributeChanged={isAttributeChanged}
        payload={confirmedPayload}
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
        isLoading={isInitialDataLoading}
        isResponseChanged={isResponseChanged()}
        payload={confirmedPayload}
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
        isLoading={isInitialDataLoading}
        isPublishing={isPublishing}
        isEditMode={true}
        nextButtonText="Update"
        payload={confirmedPayload}
        errorMessage={errorMessage}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onPublishClick={onPublishClick}
      />
    ),
  }

  const renderContent = renderContentFnMap[step]

  return (
    <div className="flex flex-col gap-4">
      <UpsertTriggersSteps step={step} />
      <CosStroke />
      {renderContent()}
    </div>
  )
}
