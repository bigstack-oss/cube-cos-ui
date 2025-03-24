import { CosLoadingSpinner, GetCosBasicTable } from '@cube-frontend/ui-library'
import { TriggersActionCell } from './TriggersActionCell'
import { TriggersStatusToggle } from './TriggersStatusToggle'
import { useTriggerRows } from './useTriggerRows'
import { getTriggerResponse, TriggerRow } from './utils'

const TriggersTable = GetCosBasicTable<TriggerRow>()

export const EventsTriggersTable = () => {
  const { rows, isLoading, handleStatusChange, handleEdit, handleDelete } =
    useTriggerRows()

  return (
    <div className="flex flex-col gap-2">
      <div className="primary-h5">Triggers</div>
      <TriggersTable rows={rows} isLoading={isLoading}>
        <TriggersTable.Column label="Triggers" property="name">
          {(name, row) => (
            <span className="flex items-center">
              {name}
              {row.isResetting && <CosLoadingSpinner variant="dot120" />}
            </span>
          )}
        </TriggersTable.Column>
        <TriggersTable.Column label="Description" property="description" />
        <TriggersTable.Column label="Response" property="response">
          {(response) => (
            <span className="whitespace-nowrap">
              {getTriggerResponse(response.types)}
            </span>
          )}
        </TriggersTable.Column>
        <TriggersTable.Column label="Status" property="enabled">
          {(enabled, row) => (
            <TriggersStatusToggle
              isLoading={row.isResetting ?? false}
              triggerName={row.name}
              isOn={enabled}
              onChange={handleStatusChange}
            />
          )}
        </TriggersTable.Column>
        <TriggersTable.Column>
          {(_, row) => (
            <TriggersActionCell
              isLoading={row.isResetting ?? false}
              triggerName={row.name}
              onEditClick={handleEdit}
              onDeleteClick={handleDelete}
            />
          )}
        </TriggersTable.Column>
      </TriggersTable>
    </div>
  )
}
