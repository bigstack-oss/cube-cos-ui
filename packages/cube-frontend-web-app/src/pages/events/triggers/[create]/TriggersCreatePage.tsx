import { useState } from 'react'
import { CosStroke } from '@cube-frontend/ui-library'
import { TriggersCreateGoBackButton } from './_components/TriggersCreateGoBackButton'
import { TriggersCreateSteps } from './_components/TriggersCreateSteps'
import { TriggersCreateForm } from './_components/TriggersCreateForm'
import { useTrigger } from './_components/useTrigger'
import { useTriggerCreateForm } from './_components/useCreateTriggerForm'
import { useTemplateTable } from './_components/useTemplateTable'
import { TriggersCreateStep, triggersCreateSteps } from './_components/utils'
import { TriggersCreateContext } from './_components/context'

export const TriggersCreatePage = () => {
  const [activeStep, setActiveStep] = useState<TriggersCreateStep>(
    triggersCreateSteps[0],
  )

  const {
    dataCenter,
    isTemplateLoading,
    templateRows,
    disabledRowsId,
    selectedTemplateName,
    handleTemplateSelect,
  } = useTemplateTable()

  const { isTriggerLoading, trigger } = useTrigger({
    dataCenter,
    selectedTemplateName,
  })

  const {
    enabled,
    attributes,
    selectedEmails,
    selectedSlacks,
    description,
    handleEmailSelect,
    handleEmailSelectAll,
    handleSlackSelect,
    handleSlackSelectAll,
    handleDescriptionChange,
  } = useTriggerCreateForm({ isTriggerLoading, trigger })

  return (
    <TriggersCreateContext.Provider
      value={{
        // Step Params
        activeStep,
        setActiveStep,
        // Template Table
        isTemplateLoading,
        templateRows,
        disabledRowsId,
        selectedTemplateName,
        handleTemplateSelect,
        // The Rest Form Fields
        trigger,
        isTriggerLoading,
        enabled,
        attributes,
        selectedEmails,
        selectedSlacks,
        description,
        // Form Field Handlers
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
