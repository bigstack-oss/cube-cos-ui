import {
  CosIconText,
  CosLoadingSpinner,
  CosTableInput,
  GetCosBasicTable,
} from '@cube-frontend/ui-library'
import { noop } from 'lodash'
import { EmailSendersHeader } from './EmailSendersHeader'
import { EmailSenderRow } from './emailSendersUtils'
import { ActionCell } from './tableCells/ActionCell'
import { PasswordCell } from './tableCells/PasswordCell'
import { UseEmailSenderRows } from './useEmailSenderRows'
import { useEmailSenderRowsErrorMap } from './useEmailSenderRowsErrorMap'
import { useVerifyEmailSenderModal } from './useVerifyEmailSenderModal'
import { VerifyEmailSenderModal } from './VerifyEmailSenderModal'

type EmailSendersProps = UseEmailSenderRows & {
  isLoading: boolean
}

const EmailSenderTable = GetCosBasicTable<EmailSenderRow>()

export const EmailSenders = (props: EmailSendersProps) => {
  const {
    isLoading,
    rows,
    onEditClick,
    onCancelEditClick,
    onChange,
    onSaveClick,
    onSenderVerified: onSenderVerifiedProp,
  } = props

  const rowsErrorMap = useEmailSenderRowsErrorMap(rows)

  const {
    isVerifyModalOpen,
    toBeVerifiedRow,
    onVerifyClick,
    onCloseVerifyModal,
  } = useVerifyEmailSenderModal(rows)

  const onSenderVerified = (rowId: string): void => {
    onSenderVerifiedProp(rowId)
    onCloseVerifyModal()
  }

  return (
    <div className="flex flex-col gap-y-2">
      {/* Hide the add button because the "Add Email Sender" feature
          is not available in phase 1. */}
      <EmailSendersHeader isAddButtonVisible={false} onAddButtonClick={noop} />
      <EmailSenderTable isLoading={isLoading} rows={rows}>
        <EmailSenderTable.Column property="from" label="From Email">
          {(from, row) => (
            <div className="flex items-center gap-x-2">
              {row.isEditing ? (
                <CosTableInput
                  name={'from' satisfies keyof EmailSenderRow}
                  type="email"
                  value={from}
                  errorMessage={rowsErrorMap.get(row.id)?.from}
                  disabled={row.status.isUpdating}
                  onChange={(e) => onChange(row.id, e)}
                />
              ) : (
                <div className="flex items-center gap-2">
                  {from}
                  {!row.isNew && !row.accessVerified && (
                    <CosIconText type="warning">unverified</CosIconText>
                  )}
                  {row.status.isUpdating && (
                    <CosLoadingSpinner variant="dot120" />
                  )}
                </div>
              )}
            </div>
          )}
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="host" label="Host">
          {(host, row) =>
            row.isEditing ? (
              <CosTableInput
                name={'host' satisfies keyof EmailSenderRow}
                value={host}
                errorMessage={rowsErrorMap.get(row.id)?.host}
                disabled={row.status.isUpdating}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              host
            )
          }
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="port" label="Port">
          {(port, row) =>
            row.isEditing ? (
              <CosTableInput
                className="w-16"
                name={'port' satisfies keyof EmailSenderRow}
                value={port}
                errorMessage={rowsErrorMap.get(row.id)?.port}
                disabled={row.status.isUpdating}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              port
            )
          }
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="username" label="Username">
          {(username, row) =>
            row.isEditing ? (
              <CosTableInput
                className="w-24"
                name={'username' satisfies keyof EmailSenderRow}
                value={username}
                errorMessage={rowsErrorMap.get(row.id)?.username}
                disabled={row.status.isUpdating}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              username
            )
          }
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="password" label="Password">
          {(_, row) => (
            <PasswordCell row={row} onChange={(e) => onChange(row.id, e)} />
          )}
        </EmailSenderTable.Column>
        <EmailSenderTable.Column>
          {(_, row) => (
            <ActionCell
              row={row}
              rowError={rowsErrorMap.get(row.id)}
              nonEditingActions={{
                onEditClick,
                onVerifyClick,
              }}
              editingActions={{
                onSaveClick,
                onCancelEditClick,
              }}
            />
          )}
        </EmailSenderTable.Column>
      </EmailSenderTable>
      <VerifyEmailSenderModal
        isOpen={isVerifyModalOpen}
        toBeVerifiedRow={toBeVerifiedRow}
        onSenderVerified={onSenderVerified}
        onClose={onCloseVerifyModal}
      />
    </div>
  )
}
