import { useContext } from 'react'
import { CosStepProcess } from '@cube-frontend/ui-library'
import { TriggersCreateContext } from '../context'
import { triggersCreateSteps } from '../useCreateTriggerStep'

export const TriggersCreateSteps = () => {
  const { step } = useContext(TriggersCreateContext)

  return (
    <CosStepProcess isLoading={false}>
      {triggersCreateSteps.map((stepItem, index) => (
        <CosStepProcess.Item
          key={stepItem.param}
          serialNumber={index + 1}
          label={stepItem.label}
          isActive={stepItem.param === step}
        />
      ))}
    </CosStepProcess>
  )
}
