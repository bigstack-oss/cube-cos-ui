import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { EmailRecipientTableRow } from './useNotification'

const EmailRecipientTable = GetCosBatchActionTable<EmailRecipientTableRow>()

type EmailBatchActionTableProps = {
  isLoading: boolean
  rows: EmailRecipientTableRow[]
  selectedRowIds: string[]
  onCheckChange: (email: string) => void
}

export const EmailBatchActionTable = (props: EmailBatchActionTableProps) => {
  const { isLoading, rows, selectedRowIds, onCheckChange } = props

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
