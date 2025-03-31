import { useContext } from 'react'
import { CosBackButton } from '@cube-frontend/ui-library'
import { TriggersCreateContext } from './context'
import { triggersCreateSteps } from './utils'
import { useNavigate } from 'react-router'

export const TriggersCreateGoBackButton = () => {
  const navigate = useNavigate()

  const { activeStep, setActiveStep } = useContext(TriggersCreateContext)

  const handleGoToPrevStep = () => {
    const prevStepSerialNumber = activeStep.serialNumber - 1
    const prevStep = triggersCreateSteps.find(
      (step) => step.serialNumber === prevStepSerialNumber,
    )

    if (!prevStep) {
      setActiveStep(triggersCreateSteps[0])
      navigate('/events/triggers')
      return
    }

    setActiveStep(prevStep)
  }

  return (
    <div className="flex h-8 items-center">
      <CosBackButton onClick={handleGoToPrevStep}>
        Create from Template
      </CosBackButton>
    </div>
  )
}
