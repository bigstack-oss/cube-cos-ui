import { useContext } from 'react'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { TriggersCreateContext } from '../context'
import { TemplateRow } from '../useTemplateTable'

const TemplateTable = GetCosBatchActionTable<TemplateRow>()

export const TriggersStepTemplate = () => {
  const {
    isTemplateLoading,
    templateRows,
    selectedTemplateName,
    disabledRowsId,
    handleTemplateSelect,
  } = useContext(TriggersCreateContext)

  return (
    <div className="flex flex-col gap-2 rounded-[5px] bg-white px-6 py-4">
      <div className="primary-h5 text-functional-text">Templates</div>
      <TemplateTable
        rows={templateRows}
        isLoading={isTemplateLoading}
        selectedRowIds={selectedTemplateName ? [selectedTemplateName] : []}
        disabledRowIds={disabledRowsId}
        onCheckChange={handleTemplateSelect}
        showHeaderCheckbox={false}
      >
        <TemplateTable.Column label="Templates" property="name" />
        <TemplateTable.Column label="Description" property="description" />
      </TemplateTable>
    </div>
  )
}
