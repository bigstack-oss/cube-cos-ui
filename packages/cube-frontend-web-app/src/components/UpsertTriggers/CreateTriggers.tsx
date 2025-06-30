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
import { useCreateTriggersPayload } from './_components/useCreateTriggersPayload'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'
import {
  UpsertTriggersPayload,
  UpsertTriggersStep,
} from './upsertTriggersUtils'

type CreateTriggersProps = {
  onPublishClick: (payload: UpsertTriggersPayload) => void
}

export const CreateTriggers = (props: CreateTriggersProps) => {
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
    payload,
    onAlertTypeSelect,
    onSeveritySelect,
    onCategorySelect,
    onEventIdSelect,
    onEmailSelect,
    onSlackSelect,
    onNameChange,
    onDescriptionChange,
  } = useCreateTriggersPayload()

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isLoading={false}
        payload={payload}
        severities={attributes?.system.severities ?? []}
        alertTypes={['system', 'host', 'instance']}
        categories={attributes?.system.categories ?? []}
        eventIds={attributes?.instance.ids ?? []}
        onAlertTypeSelect={onAlertTypeSelect}
        onSeveritySelect={onSeveritySelect}
        onCategorySelect={onCategorySelect}
        onEventIdSelect={onEventIdSelect}
        onNextClick={goToSetResponse}
      />
    ),
    setResponse: () => (
      <SetResponse
        isLoading={false}
        payload={payload}
        emails={emails}
        slacks={slacks}
        onEmailSelect={onEmailSelect}
        onSlackSelect={onSlackSelect}
        onNextClick={goToAddDescription}
      />
    ),
    addDescription: () => (
      <AddDescription
        isLoading={false}
        nextButtonText="Create"
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
