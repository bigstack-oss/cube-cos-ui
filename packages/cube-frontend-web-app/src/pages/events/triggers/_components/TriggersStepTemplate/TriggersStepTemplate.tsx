import { useContext } from 'react'
import { CosStroke, GetCosBatchActionTable } from '@cube-frontend/ui-library'

import { TriggersNextButton } from '../TriggersNextButton'
import { TriggersCreateContext } from '../../create/context'
import { TemplateRow } from '../../create/useTemplateTable'

const TemplateTable = GetCosBatchActionTable<TemplateRow>()

export const TriggersStepTemplate = () => {
  const {
    goToEvents,
    isTemplateLoading,
    templateRows,
    selectedTemplate,
    disabledRowsId,
    handleTemplateSelect,
    isFormValueValid,
    errorMessage,
  } = useContext(TriggersCreateContext)

  return (
    <div className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-6 py-4 [box-shadow:0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
      <div className="flex flex-col gap-y-2">
        <h5 className="primary-h5 text-functional-text">Templates</h5>
        <TemplateTable
          rows={templateRows}
          isLoading={isTemplateLoading}
          selectedRowIds={selectedTemplate ? [selectedTemplate.name] : []}
          disabledRowIds={disabledRowsId}
          onCheckChange={handleTemplateSelect}
          showHeaderCheckbox={false}
        >
          <TemplateTable.Column label="Templates" property="name" />
          <TemplateTable.Column label="Description" property="description" />
        </TemplateTable>
      </div>
      <CosStroke type="dot" />
      <div className="flex flex-col gap-y-2">
        {errorMessage && (
          <div className="primary-body3 text-status-negative">
            {errorMessage}
          </div>
        )}
        <TriggersNextButton
          isLoading={isTemplateLoading}
          disabled={!isFormValueValid}
          onClick={goToEvents}
        />
      </div>
    </div>
  )
}
