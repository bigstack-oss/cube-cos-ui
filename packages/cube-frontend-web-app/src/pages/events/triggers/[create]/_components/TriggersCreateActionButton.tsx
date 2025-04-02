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
    isTemplateLoading,
    selectedTemplateName,
    isTriggerLoading,
    enabled,
    attributes,
    selectedEmails,
    selectedSlacks,
  } = useContext(TriggersCreateContext)

  const { isValid, errorMessage } = isFormValueValid(
    activeStep,
    selectedTemplateName,
    selectedEmails,
    selectedSlacks,
  )

  const { isUpdateLoading, handleTriggerUpdate, errorState } = useUpdateTrigger(
    {
      isValid,
      enabled,
      attributes,
      selectedTemplateName,
      selectedEmails,
      selectedSlacks,
    },
  )

  const isLastStep = activeStep.serialNumber === 4

  const isLoading = isTemplateLoading || isTriggerLoading

  const renderErrorMessage = () => {
    if (errorMessage || errorState?.api?.msg || errorState?.native?.message)
      return (
        <div className="primary-body3 text-status-negative">
          {errorMessage || errorState?.api?.msg || errorState?.native?.message}
        </div>
      )

    return null
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
        disabled={!!errorState}
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
        loading={isLoading}
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
