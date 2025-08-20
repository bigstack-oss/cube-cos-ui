import { CosStepProcess } from '@cube-frontend/ui-library'
import { UpsertTuningsStep } from '../upsertTuningsUtils'

type UpsertTuningsStepsProps = {
  step: UpsertTuningsStep
}

const stepItems = [
  {
    label: 'Key-Value',
    step: UpsertTuningsStep.KeyValue,
  },
  {
    label: 'Select Hosts',
    step: UpsertTuningsStep.SelectHosts,
  },
  {
    label: 'Publish',
    step: UpsertTuningsStep.Publish,
  },
]

export const UpsertTuningsSteps = (props: UpsertTuningsStepsProps) => {
  const { step } = props

  return (
    <CosStepProcess className="mt-3">
      {stepItems.map((stepItem, index) => (
        <CosStepProcess.Item
          key={stepItem.step}
          label={stepItem.label}
          stepNumber={index + 1}
          isActive={step === stepItem.step}
        />
      ))}
    </CosStepProcess>
  )
}
