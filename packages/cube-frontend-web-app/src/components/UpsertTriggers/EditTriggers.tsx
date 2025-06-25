import { ReactNode } from 'react'
import { UpsertTriggersStep } from './upsertTriggersUtils'
import { useStepParam } from './_components/useStepParam'
import { UpsertTriggersSteps } from './_components/UpsertTriggersSteps'
import { useCreateTriggersPayload } from './_components/useCreateTriggersPayload'
import { SelectEvents } from './_components/SelectEvents/SelectEvents'
import { SetResponse } from './_components/SetResponse/SetResponse'
import { AddDescription } from './_components/AddDescription/AddDescription'

export const EditTriggers = () => {
  const { step, goToSetResponse, goToAddDescription } = useStepParam([
    UpsertTriggersStep.SelectEvents,
    UpsertTriggersStep.SetResponse,
    UpsertTriggersStep.AddDescription,
  ])

  const { payload } = useCreateTriggersPayload()

  const renderContentFnMap: Record<UpsertTriggersStep, () => ReactNode> = {
    selectEvents: () => (
      <SelectEvents
        isLoading={false}
        payload={payload}
        onNextClick={goToSetResponse}
      />
    ),
    setResponse: () => (
      <SetResponse
        isLoading={false}
        payload={payload}
        onNextClick={goToAddDescription}
      />
    ),
    addDescription: () => (
      <AddDescription
        isLoading={false}
        payload={payload}
        onNextClick={goToAddDescription}
        nextButtonText="Update"
      />
    ),
  }

  const renderContent = renderContentFnMap[step]

  return (
    <div>
      <UpsertTriggersSteps step={step} />
      {renderContent()}
    </div>
  )
}
