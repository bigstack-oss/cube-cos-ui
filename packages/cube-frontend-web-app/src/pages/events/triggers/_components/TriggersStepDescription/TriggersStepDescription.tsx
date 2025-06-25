import { CosButton, CosStroke, CosTextArea } from '@cube-frontend/ui-library'
import { useContext } from 'react'

import { TriggersPreviousButton } from '../TriggersPreviousButton'
import { TriggersCreateContext } from '../../create/context'
import { useUpdateTrigger } from '../../create/useUpdateTrigger'

export const TriggersStepDescription = () => {
  const {
    formValue,
    handleDescriptionChange,
    isFormValueValid,
    errorMessage,
    selectedTemplate,
  } = useContext(TriggersCreateContext)

  const { isUpdating, handleTriggerUpdate, errorState } = useUpdateTrigger({
    isFormValueValid,
    formValue,
    selectedTemplate,
  })

  const renderErrorMessage = () => {
    if (errorMessage || errorState?.api?.msg || errorState?.native?.message)
      return (
        <div className="primary-body3 text-status-negative">
          {errorMessage || errorState?.api?.msg || errorState?.native?.message}
        </div>
      )

    return null
  }

  return (
    <div className="flex flex-col gap-y-4">
      <div className="rounded-[5px] bg-grey-0 px-6 py-4 [box-shadow:0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
        <CosTextArea
          label="Description"
          maxLength={1000}
          value={formValue?.formDescription}
          onChange={handleDescriptionChange}
        />
      </div>
      <CosStroke type="dot" />
      <div className="flex w-fit flex-col gap-2">
        {renderErrorMessage()}
        <div className="flex items-center gap-x-4">
          <TriggersPreviousButton />
          <CosButton
            size="md"
            type="primary"
            loading={isUpdating}
            disabled={!!errorState}
            onClick={handleTriggerUpdate}
            className="w-fit"
          >
            Update
          </CosButton>
        </div>
      </div>
    </div>
  )
}
