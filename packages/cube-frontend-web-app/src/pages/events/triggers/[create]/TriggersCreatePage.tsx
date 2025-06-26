import { CosBackButton, CosStroke } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { ReactNode } from 'react'
import { Link, Navigate } from 'react-router'
import { TriggersCreateSteps } from './_components/TriggersCreateSteps'
import { TriggersStepDescription } from './_components/TriggersStepDescription/TriggersStepDescription'
import { TriggersStepEvent } from './_components/TriggersStepEvents/TriggersStepEvents'
import { TriggersStepResponse } from './_components/TriggersStepResponse/TriggersStepResponse'
import { TriggersStepTemplate } from './_components/TriggersStepTemplate/TriggersStepTemplate'
import { TriggersCreateContext } from './context'
import { useTriggerCreateForm } from './useCreateTriggerForm'
import {
  CreateTriggerStepParams,
  useCreateTriggerStep,
} from './useCreateTriggerStep'
import { useTemplateTable } from './useTemplateTable'

export const TriggersCreatePage = () => {
  const { step, goToEvents, goToResponse, goToDescription } =
    useCreateTriggerStep()

  /**
   * It is used to handle the template table
   */
  const {
    isTemplateLoading,
    templateRows,
    disabledRowsId,
    selectedTemplate,
    handleTemplateSelect,
  } = useTemplateTable()

  const {
    formOptions,
    formValue,
    isFormValueValid,
    errorMessage,
    handleEmailSelect,
    handleEmailSelectAll,
    handleSlackSelect,
    handleSlackSelectAll,
    handleDescriptionChange,
  } = useTriggerCreateForm({
    step,
    isTemplateLoading,
    selectedTemplate,
  })

  const renderContentFnMap: Record<CreateTriggerStepParams, () => ReactNode> = {
    selectTemplate: () => <TriggersStepTemplate />,
    selectEvent: () => <TriggersStepEvent />,
    setResponse: () => <TriggersStepResponse />,
    addDescription: () => <TriggersStepDescription />,
  }

  const renderContent = renderContentFnMap[step]

  if (step !== CreateTriggerStepParams.TEMPLATE && !selectedTemplate?.name) {
    return <Navigate to={CosRoutesEnum.EVENTS_TRIGGERS_PAGE} replace={true} />
  }

  return (
    <TriggersCreateContext.Provider
      value={{
        /**
         * Create / Edit Trigger Steps
         */
        step,
        goToEvents,
        goToResponse,
        goToDescription,
        /**
         * Template Table
         */
        isTemplateLoading,
        templateRows,
        disabledRowsId,
        selectedTemplate,
        handleTemplateSelect,
        /**
         * Form fields
         */
        formOptions,
        formValue,
        isFormValueValid,
        errorMessage,
        handleEmailSelect,
        handleEmailSelectAll,
        handleSlackSelect,
        handleSlackSelectAll,
        handleDescriptionChange,
      }}
    >
      <div className="flex flex-col gap-4">
        <CosBackButton
          backButtonContainer={{
            Component: Link,
            props: {
              to: CosRoutesEnum.EVENTS_TRIGGERS_PAGE,
            },
          }}
        >
          Create from Template
        </CosBackButton>
        <TriggersCreateSteps />
        <CosStroke />
        {renderContent()}
      </div>
    </TriggersCreateContext.Provider>
  )
}
