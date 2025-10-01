import { useState } from 'react'
import { Link } from 'react-router'
import {
  CosButton,
  CosGeneralPanel,
  CosInlineNotification,
  CosLoadingSpinner,
  CosModal,
  CosPagination,
  CosStroke,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import Plus from '@cube-frontend/ui-library/icons/monochrome/plus.svg?react'
import { useOperationErrors } from '@cube-frontend/web-app/hooks/useOperationErrors/useOperationErrors'
import { useTriggerRows } from './useTriggerRows'
import { useListTriggerQuery } from './useListTriggerQuery'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { TriggersStatusToggle } from './_components/TriggersStatusToggle'
import { TriggersActionCell } from './_components/TriggersActionCell'
import { getTriggerResponse, TriggerRow } from './utils'

const TriggersTable = GetCosBasicTable<TriggerRow>()

export const EventsTriggersPage = () => {
  const [toBeDeletedRowId, setToBeDeletedRowId] = useState<string | undefined>(
    undefined,
  )

  const { operationErrors, onOperationErrorOccur, onOperationErrorClose } =
    useOperationErrors()

  const { query, onPageChange, onItemsPerPageChange } = useListTriggerQuery()

  const { isLoading, rows, page, onToggleChange, onTriggerDelete } =
    useTriggerRows({
      query,
      onOperationErrorOccur,
    })

  const onDeleteClick = (rowId: string): void => {
    setToBeDeletedRowId(rowId)
  }

  const onCloseDeleteModal = (): void => {
    setToBeDeletedRowId(undefined)
  }

  const onConfirmDelete = async (): Promise<void> => {
    if (toBeDeletedRowId) {
      onCloseDeleteModal()
      await onTriggerDelete(toBeDeletedRowId)
    }
  }

  return (
    <CosGeneralPanel topic="Triggers">
      <div className="flex flex-col gap-y-6">
        <Link
          className="self-start"
          to={CosRoutesEnum.EVENTS_TRIGGERS_CREATE_PAGE}
        >
          <CosButton usage="icon-left" Icon={Plus}>
            Create Trigger
          </CosButton>
        </Link>
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
          <TriggersTable.Column
            label="Triggers"
            property="name"
            emphasize={true}
          >
            {(name, row) => (
              <div className="flex items-center gap-2">
                {name}
                {row.isProcessing && <CosLoadingSpinner variant="dot120" />}
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
              <TriggersActionCell row={row} onDeleteClick={onDeleteClick} />
            )}
          </TriggersTable.Column>
        </TriggersTable>
        <CosPagination
          totalItems={page?.totalItemCount ?? 0}
          currentPage={query.currentPage}
          itemsPerPage={query.itemsPerPage}
          onPageChange={onPageChange}
          onItemsPerPageChange={onItemsPerPageChange}
        />
        <CosModal
          title="Delete Trigger"
          size="sm"
          isOpen={!!toBeDeletedRowId}
          actionText="Delete"
          onActionClick={onConfirmDelete}
          onCloseClick={onCloseDeleteModal}
        >
          <div className="primary-body2 text-functional-text">
            Are you sure you want to delete this trigger:&nbsp;
            <span className="font-semibold">{toBeDeletedRowId}</span>?
          </div>
        </CosModal>
      </div>
    </CosGeneralPanel>
  )
}
