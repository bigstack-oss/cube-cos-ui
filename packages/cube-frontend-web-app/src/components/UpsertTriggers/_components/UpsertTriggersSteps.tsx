import { CosStepProcess, CosStepProcessItem } from '@cube-frontend/ui-library'
import { UpsertTriggersStep } from '../upsertTriggersUtils'

type UpsertTriggersStepsProps = {
  step: UpsertTriggersStep
}

const stepItems = [
  {
    label: 'Select Events',
    step: UpsertTriggersStep.SelectEvents,
  },
  {
    label: 'Set Response',
    step: UpsertTriggersStep.SetResponse,
  },
  {
    label: 'Add Description',
    step: UpsertTriggersStep.AddDescription,
  },
]

export const UpsertTriggersSteps = (props: UpsertTriggersStepsProps) => {
  const { step } = props

  return (
    <CosStepProcess>
      {stepItems.map((stepItem, index) => (
        <CosStepProcessItem
          key={stepItem.step}
          label={stepItem.label}
          serialNumber={index + 1}
          isActive={step === stepItem.step}
        />
      ))}
    </CosStepProcess>
  )
}
