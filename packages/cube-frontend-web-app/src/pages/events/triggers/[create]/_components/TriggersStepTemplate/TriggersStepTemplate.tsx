import { useContext, useMemo } from 'react'
import { CosTableRow, GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { GetTriggerResponseData } from '@cube-frontend/api'
import { TriggersCreateContext } from '../context'

type TemplateRow = Pick<GetTriggerResponseData, 'name' | 'description'> &
  CosTableRow

const mapToTemplateTableRows = (
  trigger: GetTriggerResponseData | undefined,
): TemplateRow[] => {
  if (!trigger) return []
  return [
    {
      name: trigger.name,
      description: trigger.description,
      id: trigger.name,
    },
  ]
}

const TemplateTable = GetCosBatchActionTable<TemplateRow>()

export const TriggersStepTemplate = () => {
  const {
    trigger,
    isTriggerLoading,
    selectedTemplate,
    handleTemplateSelect,
    handleTemplateSelectAll,
  } = useContext(TriggersCreateContext)

  const rows = useMemo(() => {
    return mapToTemplateTableRows(trigger)
  }, [trigger])

  return (
    <div className="flex flex-col gap-2 rounded-[5px] bg-white px-6 py-4">
      <div className="primary-h5 text-functional-text">Templates</div>
      <TemplateTable
        rows={rows}
        isLoading={isTriggerLoading}
        selectedRowIds={selectedTemplate ? [selectedTemplate] : []}
        onCheckChange={handleTemplateSelect}
        onAllCheckChange={handleTemplateSelectAll}
      >
        <TemplateTable.Column label="Templates" property="name" />
        <TemplateTable.Column label="Description" property="description" />
      </TemplateTable>
    </div>
  )
}
