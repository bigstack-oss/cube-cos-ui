import { useState } from 'react'
import { CosStroke } from '@cube-frontend/ui-library'
import { TriggersCreateGoBackButton } from './_components/TriggersCreateGoBackButton'
import { TriggersCreateSteps } from './_components/TriggersCreateSteps'
import { TriggersCreateForm } from './_components/TriggersCreateForm'
import { useTrigger } from './_components/useTrigger'
import { useTriggerCreateForm } from './_components/useCreateTriggerForm'
import { TriggersCreateContext } from './_components/context'
import { TriggersCreateStep, triggersCreateSteps } from './_components/utils'

export const TriggersCreatePage = () => {
  const [activeStep, setActiveStep] = useState<TriggersCreateStep>(
    triggersCreateSteps[0],
  )

  const { trigger, isTriggerLoading } = useTrigger()

  const {
    enabled,
    selectedTemplate,
    attributes,
    selectedEmails,
    selectedSlacks,
    description,
    handleTemplateSelect,
    handleTemplateSelectAll,
    handleEmailSelect,
    handleEmailSelectAll,
    handleSlackSelect,
    handleSlackSelectAll,
    handleDescriptionChange,
  } = useTriggerCreateForm({ trigger, isTriggerLoading })

  return (
    <TriggersCreateContext.Provider
      value={{
        activeStep,
        setActiveStep,
        trigger,
        isTriggerLoading,
        enabled,
        selectedTemplate,
        attributes,
        selectedEmails,
        selectedSlacks,
        description,
        handleTemplateSelect,
        handleTemplateSelectAll,
        handleEmailSelect,
        handleEmailSelectAll,
        handleSlackSelect,
        handleSlackSelectAll,
        handleDescriptionChange,
      }}
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-px">
          <TriggersCreateGoBackButton />
          <TriggersCreateSteps />
        </div>
        <CosStroke />
        <TriggersCreateForm />
      </div>
    </TriggersCreateContext.Provider>
  )
}
