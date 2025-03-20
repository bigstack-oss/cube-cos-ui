import {
  CosIconText,
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
        <EmailSenderTable.Column property="email" label="Email">
          {(email, row) => (
            <div className="flex items-center gap-x-2">
              {row.isEditing ? (
                <CosTableInput
                  name="email"
                  type="email"
                  value={email}
                  errorMessage={rowsErrorMap.get(row.id)?.email}
                  disabled={row.isSaving}
                  onChange={(e) => onChange(row.id, e)}
                />
              ) : (
                <>
                  {email}
                  {!row.isNew && !row.accessVerified && (
                    <CosIconText type="warning">unverified</CosIconText>
                  )}
                </>
              )}
            </div>
          )}
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="host" label="host">
          {(host, row) =>
            row.isEditing ? (
              <CosTableInput
                name="host"
                value={host}
                errorMessage={rowsErrorMap.get(row.id)?.host}
                disabled={row.isSaving}
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
                name="port"
                value={port}
                errorMessage={rowsErrorMap.get(row.id)?.port}
                disabled={row.isSaving}
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
                name="username"
                value={username}
                errorMessage={rowsErrorMap.get(row.id)?.username}
                disabled={row.isSaving}
                onChange={(e) => onChange(row.id, e)}
              />
            ) : (
              username
            )
          }
        </EmailSenderTable.Column>
        <EmailSenderTable.Column property="password" label="Password">
          {(_, row) => (
            <PasswordCell
              row={row}
              errorMessage={rowsErrorMap.get(row.id)?.password}
              onChange={(e) => onChange(row.id, e)}
            />
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
