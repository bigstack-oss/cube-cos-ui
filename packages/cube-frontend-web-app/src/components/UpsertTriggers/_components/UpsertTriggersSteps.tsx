import { useTranslation } from 'react-i18next'
import { CosStepProcess } from '@cube-frontend/ui-library'
import { UpsertTriggersStep } from '../upsertTriggersUtils'

type UpsertTriggersStepsProps = {
  step: UpsertTriggersStep
}

export const UpsertTriggersSteps = (props: UpsertTriggersStepsProps) => {
  const { step } = props

  const { t } = useTranslation()

  const stepItems = [
    {
      label: t('events.triggers.upsert.steps.selectEvents'),
      step: UpsertTriggersStep.SelectEvents,
    },
    {
      label: t('events.triggers.upsert.steps.setResponse'),
      step: UpsertTriggersStep.SetResponse,
    },
    {
      label: t('events.triggers.upsert.steps.addDescription'),
      step: UpsertTriggersStep.AddDescription,
    },
  ]

  return (
    <CosStepProcess>
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
