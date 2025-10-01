import { EmailRecipientResponse } from '@cube-frontend/api'
import {
  CosLoadingSpinner,
  CosModal,
  CosTableInput,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { EmailRecipientsHeader } from './EmailRecipientsHeader'
import { EmailRecipientRow } from './emailRecipientsUtils'
import { ActionCell } from './tableCells/ActionCell'
import { useDeleteEmailRecipientModal } from './useDeleteEmailRecipientModal'
import { useEmailRecipientRows } from './useEmailRecipientRows'
import { useEmailRecipientRowsErrorMap } from './useEmailRecipientRowsErrorMap'

type EmailRecipientsProps = {
  isLoading: boolean
  recipientsFromApi?: EmailRecipientResponse[] | undefined
  hasVerifiedSender: boolean
}

const EmailRecipientTable = GetCosBasicTable<EmailRecipientRow>()

export const EmailRecipients = (props: EmailRecipientsProps) => {
  const { isLoading, recipientsFromApi, hasVerifiedSender } = props

  const {
    rows,
    onAddClick,
    onEditClick,
    onCancelEditClick,
    onChange,
    onTryClick,
    onSaveClick,
    deleteEmailRecipient,
  } = useEmailRecipientRows(recipientsFromApi)

  const rowsErrorMap = useEmailRecipientRowsErrorMap(rows)

  const {
    isDeleteModalOpen,
    toBeDeletedRowId,
    onDeleteClick,
    onCloseDeleteModal,
  } = useDeleteEmailRecipientModal()

  const onConfirmDelete = async (): Promise<void> => {
    if (toBeDeletedRowId) {
      onCloseDeleteModal()
      await deleteEmailRecipient(toBeDeletedRowId)
    }
  }

  return (
    <div className="flex flex-col gap-y-2">
      <EmailRecipientsHeader
        isCountLimitReached={rows.length >= 10}
        isRowsLoading={isLoading}
        onAddButtonClick={onAddClick}
      />
      <EmailRecipientTable isLoading={isLoading} rows={rows}>
        <EmailRecipientTable.Column property="address" label="Email">
          {(address, row) =>
            row.isEditing ? (
              <CosTableInput
                name="address"
                placeholder="Email"
                value={address}
                errorMessage={rowsErrorMap.get(row.id)?.address}
                disabled={row.status.isUpdating}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              <div className="flex items-center gap-2">
                {address}
                {row.status.isUpdating && (
                  <CosLoadingSpinner variant="dot120" />
                )}
              </div>
            )
          }
        </EmailRecipientTable.Column>
        <EmailRecipientTable.Column property="note" label="Note">
          {(note, row) =>
            row.isEditing ? (
              <CosTableInput
                name="note"
                placeholder="Note"
                value={note}
                errorMessage={rowsErrorMap.get(row.id)?.note}
                disabled={row.status.isUpdating}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              note
            )
          }
        </EmailRecipientTable.Column>
        <EmailRecipientTable.Column>
          {(_, row) => (
            <ActionCell
              row={row}
              rowError={rowsErrorMap.get(row.id)}
              hasVerifiedSender={hasVerifiedSender}
              nonEditingActions={{
                onEditClick,
                onTryClick,
                onDeleteClick,
              }}
              editingActions={{
                onSaveClick,
                onCancelEditClick,
              }}
            />
          )}
        </EmailRecipientTable.Column>
      </EmailRecipientTable>
      <CosModal
        title="Delete Email Recipient"
        size="sm"
        isOpen={isDeleteModalOpen}
        actionText="Delete"
        onActionClick={onConfirmDelete}
        onCloseClick={onCloseDeleteModal}
      >
        <p className="primary-body2 text-functional-text">
          Are you sure you want to delete this email recipient?
        </p>
      </CosModal>
    </div>
  )
}
