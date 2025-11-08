import { useTranslation } from 'react-i18next'
import { CosStepProcess } from '@cube-frontend/ui-library'
import { UpsertTuningsStep } from '../upsertTuningsUtils'

type UpsertTuningsStepsProps = {
  step: UpsertTuningsStep
}

export const UpsertTuningsSteps = (props: UpsertTuningsStepsProps) => {
  const { step } = props

  const { t } = useTranslation()

  const stepItems = [
    {
      label: t('maintenance.tunings.upsert.steps.keyValue'),
      step: UpsertTuningsStep.KeyValue,
    },
    {
      label: t('maintenance.tunings.upsert.steps.selectHosts'),
      step: UpsertTuningsStep.SelectHosts,
    },
    {
      label: t('maintenance.tunings.upsert.steps.publish'),
      step: UpsertTuningsStep.Publish,
    },
  ]

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
