import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()

  const selectedRowIds = selectedRows.map((row) => row.id)

  const onCheckChange = (id: string) => {
    const selectedEmail = rows.find((email) => email.id === id)

    if (!selectedEmail) return
    onRowCheckChange(selectedEmail)
  }

  return (
    <div className="flex flex-col gap-y-4">
      <h5 className="secondary-h5">
        {t('events.triggers.upsert.sendNotification.selectEmails')}
      </h5>
      <EmailRecipientTable
        isLoading={isLoading}
        rows={rows}
        selectedRowIds={selectedRowIds}
        onCheckChange={onCheckChange}
        showHeaderCheckbox={false}
        skeletonRowCount={5}
      >
        <EmailRecipientTable.Column
          label={t('events.triggers.upsert.sendNotification.email')}
          property="address"
        />
        <EmailRecipientTable.Column
          label={t('events.triggers.upsert.sendNotification.note')}
          property="note"
        />
      </EmailRecipientTable>
    </div>
  )
}
