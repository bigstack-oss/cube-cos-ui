import { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { CosBackButton, CosStroke } from '@cube-frontend/ui-library'
import { TriggersCreateSteps } from './_components/TriggersCreateSteps'
import { TriggersStepTemplate } from './_components/TriggersStepTemplate/TriggersStepTemplate'
import { TriggersStepEvent } from './_components/TriggersStepEvents/TriggersStepEvents'
import { TriggersStepResponse } from './_components/TriggersStepResponse/TriggersStepResponse'
import { TriggersStepDescription } from './_components/TriggersStepDescription/TriggersStepDescription'
import { useTriggerCreateForm } from './useCreateTriggerForm'
import { useTemplateTable } from './useTemplateTable'
import { TriggersCreateContext } from './context'
import {
  CreateTriggerStepParams,
  useCreateTriggerStep,
} from './useCreateTriggerStep'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

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
        <CosBackButton onClick={() => history.back()}>
          Create from Template
        </CosBackButton>
        <TriggersCreateSteps />
        <CosStroke />
        {renderContent()}
      </div>
    </TriggersCreateContext.Provider>
  )
}
