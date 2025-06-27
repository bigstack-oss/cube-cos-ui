import { ReactNode, useContext } from 'react'
import {
  SettingsApiGetEmailRecipientsRequest,
  SettingsApiGetSlackChannelsRequest,
} from '@cube-frontend/api'
import { settingsApi } from '@cube-frontend/web-app/api/cosApi'
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
    onEmailSelect,
    onSlackSelect,
    onNameChange,
    onDescriptionChange,
  } = useEditTriggersPayload(emails, slacks)

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isLoading={isInitializing}
        payload={payload}
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
