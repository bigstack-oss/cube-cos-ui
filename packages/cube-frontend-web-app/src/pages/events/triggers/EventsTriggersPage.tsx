import {
  CosInlineNotification,
  CosLoadingSpinner,
  CosStroke,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { useOperationErrors } from '@cube-frontend/web-app/hooks/useOperationErrors/useOperationErrors'
import { useTriggerRows } from './useTriggerRows'
import { TriggersStatusToggle } from './TriggersStatusToggle'
import { TriggersActionCell } from './TriggersActionCell'
import { getTriggerResponse, TriggerRow } from './utils'

const TriggersTable = GetCosBasicTable<TriggerRow>()

export const EventsTriggersPage = () => {
  const { operationErrors, onOperationErrorOccur, onOperationErrorClose } =
    useOperationErrors()

  const { rows, isLoading, handleStatusChange, handleEdit } = useTriggerRows({
    onOperationErrorOccur,
  })

  return (
    <div className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-6 py-4 [box-shadow:0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
      <h5 className="secondary-h4 text-functional-text">Triggers</h5>
      {operationErrors.map((error, index) => (
        <CosInlineNotification
          key={error.id}
          type="error"
          onClose={() => onOperationErrorClose(index)}
        >
          {error.message}
        </CosInlineNotification>
      ))}
      <CosStroke type="dot" />
      <div className="flex flex-col gap-2">
        <div className="primary-h5">Triggers</div>
        <TriggersTable rows={rows} isLoading={isLoading}>
          <TriggersTable.Column
            label="Triggers"
            property="name"
            emphasize={true}
          >
            {(name, row) => (
              <div className="flex items-center gap-2">
                {name}
                {row.status.isUpdating && (
                  <CosLoadingSpinner variant="dot120" />
                )}
              </div>
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
          <TriggersTable.Column label="Status">
            {(_, row) => (
              <TriggersStatusToggle row={row} onChange={handleStatusChange} />
            )}
          </TriggersTable.Column>
          <TriggersTable.Column>
            {(_, row) => (
              <TriggersActionCell row={row} onEditClick={handleEdit} />
            )}
          </TriggersTable.Column>
        </TriggersTable>
      </div>
    </div>
  )
}
