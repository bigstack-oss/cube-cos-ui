import {
  CosButton,
  CosInlineNotification,
  CosLoadingSpinner,
  CosPagination,
  CosStroke,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'
import { useOperationErrors } from '@cube-frontend/web-app/hooks/useOperationErrors/useOperationErrors'
import { useTriggerRows } from './useTriggerRows'
import { TriggersStatusToggle } from './TriggersStatusToggle'
import { TriggersActionCell } from './TriggersActionCell'
import { getTriggerResponse, TriggerRow } from './utils'
import { Link } from 'react-router'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

const TriggersTable = GetCosBasicTable<TriggerRow>()

export const EventsTriggersPage = () => {
  const { operationErrors, onOperationErrorOccur, onOperationErrorClose } =
    useOperationErrors()

  const { isLoading, rows, onToggleChange, handleEdit } = useTriggerRows({
    onOperationErrorOccur,
  })

  return (
    <div className="flex flex-col gap-y-6 rounded-[5px] bg-grey-0 px-6 py-4 [box-shadow:0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
      <div className="flex flex-col gap-y-4">
        <h4 className="secondary-h4 text-functional-text">Triggers</h4>
        <Link
          className="self-start"
          to={CosRoutesEnum.EVENTS_TRIGGERS_CREATE_PAGE}
        >
          <CosButton usage="icon-left" Icon={Plus}>
            Create Trigger
          </CosButton>
        </Link>
      </div>
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

      <TriggersTable rows={rows} isLoading={isLoading}>
        <TriggersTable.Column label="Triggers" property="name" emphasize={true}>
          {(name, row) => (
            <div className="flex items-center gap-2">
              {name}
              {row.status.isUpdating && <CosLoadingSpinner variant="dot120" />}
            </div>
          )}
        </TriggersTable.Column>
        <TriggersTable.Column label="Description" property="description">
          {(description) => <span>{description || '-'}</span>}
        </TriggersTable.Column>
        <TriggersTable.Column label="Response" property="response">
          {(response) => (
            <span className="whitespace-nowrap">
              {getTriggerResponse(response.types)}
            </span>
          )}
        </TriggersTable.Column>
        <TriggersTable.Column label="Status">
          {(_, row) => (
            <TriggersStatusToggle row={row} onChange={onToggleChange} />
          )}
        </TriggersTable.Column>
        <TriggersTable.Column>
          {(_, row) => (
            <TriggersActionCell row={row} onEditClick={handleEdit} />
          )}
        </TriggersTable.Column>
      </TriggersTable>
      <CosPagination
        totalItems={0}
        currentPage={1}
        itemsPerPage={25}
        onPageChange={() => {}}
        onItemsPerPageChange={() => {}}
      />
    </div>
  )
}
