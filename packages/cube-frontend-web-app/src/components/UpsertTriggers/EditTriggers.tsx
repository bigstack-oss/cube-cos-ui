import { ReactNode, useContext } from 'react'
import {
  EventsApiGetEventFilterConditionsRequest,
  SettingsApiGetEmailRecipientsRequest,
  SettingsApiGetSlackChannelsRequest,
} from '@cube-frontend/api'
import { eventsApi, settingsApi } from '@cube-frontend/web-app/api/cosApi'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosStroke } from '@cube-frontend/ui-library'
import { useStepParam } from './_components/useStepParam'
import { useEditTriggersPayload } from './_components/useEditTriggersPayload'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'
import {
  UpsertTriggersPayload,
  UpsertTriggersStep,
} from './upsertTriggersUtils'
import { mockAttributes } from './_components/SelectEvents/mockData'
import {
  mockEmailRecipients,
  mockSlackChannels,
} from './_components/SetResponse/mockData'

type EditTriggersProps = {
  onPublishClick: (payload: UpsertTriggersPayload) => void
}

export const EditTriggers = (props: EditTriggersProps) => {
  const { onPublishClick } = props

  const { step, goToSetResponse, goToAddDescription } = useStepParam([
    UpsertTriggersStep.SelectEvents,
    UpsertTriggersStep.SetResponse,
    UpsertTriggersStep.AddDescription,
  ])

  const { dataCenter } = useContext(DataCenterContext)

  const { data: attributes } = useCosGetRequest(
    eventsApi.getEventFilterConditions,
    (): EventsApiGetEventFilterConditionsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { data: emails = [] } = useCosGetRequest(
    settingsApi.getEmailRecipients,
    (): SettingsApiGetEmailRecipientsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const { data: slacks = [] } = useCosGetRequest(
    settingsApi.getSlackChannels,
    (): SettingsApiGetSlackChannelsRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const {
    isInitializing,
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onPersonalizedScriptSelect,
    onNameChange,
    onDescriptionChange,
    onEventsReset,
    onResponseReset,
  } = useEditTriggersPayload()

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isLoading={isInitializing}
        payload={payload}
        attributes={mockAttributes}
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
        emails={mockEmailRecipients}
        slacks={mockSlackChannels}
        onEmailSelect={onEmailSelect}
        onSlackSelect={onSlackSelect}
        onPersonalizedScriptSelect={onPersonalizedScriptSelect}
        onNextClick={goToAddDescription}
        onResetClick={onResponseReset}
      />
    ),
    addDescription: () => (
      <AddDescription
        isLoading={false}
        nextButtonText="Update"
        payload={payload}
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
