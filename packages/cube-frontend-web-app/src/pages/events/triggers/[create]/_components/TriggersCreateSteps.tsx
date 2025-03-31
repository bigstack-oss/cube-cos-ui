import { useContext } from 'react'
import { CosStepProcess } from '@cube-frontend/ui-library'
import { triggersCreateSteps } from './utils'
import { TriggersCreateContext } from './context'

export const TriggersCreateSteps = () => {
  const { activeStep } = useContext(TriggersCreateContext)

  return (
    <CosStepProcess isLoading={false}>
      {triggersCreateSteps.map((step) => (
        <CosStepProcess.Item
          key={`create-${step.label}`}
          serialNumber={step.serialNumber}
          label={step.label}
          isActive={step.label === activeStep.label}
        />
      ))}
    </CosStepProcess>
  )
}
