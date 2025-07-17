import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { EmailRecipientTableRow } from '../SetResponse'

const EmailRecipientTable = GetCosBatchActionTable<EmailRecipientTableRow>()

type EmailBatchActionTableProps = {
  isLoading: boolean
  rows: EmailRecipientTableRow[]
  selectedRows: EmailRecipientTableRow[]
  onCheckChange: (email: EmailRecipientTableRow) => void
}

export const EmailBatchActionTable = (props: EmailBatchActionTableProps) => {
  const {
    isLoading,
    rows,
    selectedRows,
    onCheckChange: onRowCheckChange,
  } = props

  const selectedRowIds = selectedRows.map((row) => row.id)

  const onCheckChange = (id: string) => {
    const selectedEmail = rows.find((email) => email.id === id)

    if (!selectedEmail) return
    onRowCheckChange(selectedEmail)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h5 className="secondary-h5">Select Emails</h5>
      <EmailRecipientTable
        isLoading={isLoading}
        rows={rows}
        selectedRowIds={selectedRowIds}
        onCheckChange={onCheckChange}
        showHeaderCheckbox={false}
        skeletonRowCount={5}
      >
        <EmailRecipientTable.Column label="Email" property="address" />
        <EmailRecipientTable.Column label="Note" property="note" />
      </EmailRecipientTable>
    </div>
  )
}
