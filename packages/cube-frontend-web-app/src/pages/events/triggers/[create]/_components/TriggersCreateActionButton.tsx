import { useContext } from 'react'
import ChevronRight from '@cube-frontend/ui-library/icons/monochrome/chevron_right.svg?react'
import { CosButton } from '@cube-frontend/ui-library'
import { useUpdateTrigger } from './useUpdateTrigger'
import { isFormValueValid, triggersCreateSteps } from './utils'
import { TriggersCreateContext } from './context'

export const TriggersCreateActionButton = () => {
  const {
    activeStep,
    setActiveStep,
    isTriggerLoading,
    enabled,
    attributes,
    selectedTemplate,
    selectedEmails,
    selectedSlacks,
  } = useContext(TriggersCreateContext)

  const { isUpdateLoading, handleTriggerUpdate, errorState } = useUpdateTrigger(
    { enabled, attributes, selectedTemplate, selectedEmails, selectedSlacks },
  )

  const isLastStep = activeStep.serialNumber === 4

  const { isValid, errorMessage } = isFormValueValid(
    activeStep,
    selectedTemplate,
    selectedEmails,
    selectedSlacks,
  )

  const renderErrorMessage = () => {
    const message =
      errorMessage || errorState?.api?.msg || errorState?.native?.message
    if (isTriggerLoading || !message) return null
    return <div className="primary-body3 text-status-negative">{message}</div>
  }

  const handleGoToNextStep = () => {
    const nextStepSerialNumber = activeStep.serialNumber + 1
    const nextStep = triggersCreateSteps.find(
      (step) => step.serialNumber === nextStepSerialNumber,
    )

    if (!nextStep) return
    setActiveStep(nextStep)
  }

  const renderUpdateButton = () => {
    if (!isLastStep) return
    return (
      <CosButton
        size="md"
        type="primary"
        loading={isUpdateLoading}
        disabled={!isValid || isTriggerLoading}
        onClick={handleTriggerUpdate}
      >
        Update
      </CosButton>
    )
  }

  const renderGoToNextButton = () => {
    if (isLastStep) return
    return (
      <CosButton
        size="md"
        type="primary"
        usage="icon-right"
        Icon={ChevronRight}
        loading={isTriggerLoading}
        disabled={!isValid}
        onClick={handleGoToNextStep}
      >
        Next
      </CosButton>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {renderErrorMessage()}
      <div>
        {renderUpdateButton()}
        {renderGoToNextButton()}
      </div>
    </div>
  )
}
