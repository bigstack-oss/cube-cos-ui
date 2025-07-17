import {
  ReactNode,
  //useContext
} from 'react'
import { Navigate } from 'react-router'
import { CosStroke } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
// import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
// import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
// import { eventsApi } from '@cube-frontend/web-app/api/cosApi'
// import { EventsApiGetPredefinedEventsRequest } from '@cube-frontend/api'
import { useStepParam } from './_components/useStepParam'
import { useCreateTriggersPayload } from './useCreateTriggersPayload'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'
import {
  isEventsValid,
  shouldRedirectToListPage,
  UpsertTriggersPayload,
  UpsertTriggersStep,
} from './upsertTriggersUtils'
import { useTriggerMaterials } from './useTriggerMaterials'
import { mockPredefinedEvents } from './mockData'

type CreateTriggersProps = {
  errorMessage?: string | undefined
  onPublishClick: (payload: UpsertTriggersPayload) => void
}

export const CreateTriggers = (props: CreateTriggersProps) => {
  const { errorMessage, onPublishClick } = props

  // const { dataCenter } = useContext(DataCenterContext)

  const { step, goToSetResponse, goToAddDescription } = useStepParam([
    UpsertTriggersStep.SelectEvents,
    UpsertTriggersStep.SetResponse,
    UpsertTriggersStep.AddDescription,
  ])

  const { attributes, responses } = useTriggerMaterials()

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

  // TODO: replace mock data with data from API
  const predefinedEvents = isEventsValid(payload) ? mockPredefinedEvents : []

  // const { isLoading: isPredefinedEventsLoading, data: predefinedEvents } =
  //   useCosGetRequest(
  //     eventsApi.getPredefinedEvents,
  //     (): EventsApiGetPredefinedEventsRequest => ({
  //       dataCenter: dataCenter!.name,
  //       types: payload.alertTypes,
  //       severities: payload.severities,
  //       categories: payload.categories,
  //       ids: payload.eventIds,
  //     }),
  //   )

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isLoading={false}
        isPredefinedEventsLoading={false}
        payload={payload}
        attributes={attributes}
        predefinedEvents={predefinedEvents}
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
        payload={payload}
        responses={responses}
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
        nextButtonText="Create"
        payload={payload}
        errorMessage={errorMessage}
        onNameChange={onNameChange}
        onDescriptionChange={onDescriptionChange}
        onPublishClick={onPublishClick}
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
