import { useContext, useMemo } from 'react'
import { GetTriggerResponseDataResponseEmailsInner } from '@cube-frontend/api'
import { GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { ResponseEmailFilter } from './ResponseEmailFilter'
import { TriggersCreateContext } from '../context'

type EmailTableType = GetTriggerResponseDataResponseEmailsInner & { id: string }

const EmailTable = GetCosBatchActionTable<EmailTableType>()

const mapToEmailTable = (
  email: GetTriggerResponseDataResponseEmailsInner,
): EmailTableType => ({
  ...email,
  /**
   * Replace email with correct email address (waiting for API update)
   */
  id: email.note,
})

export const ResponseEmailTable = () => {
  const { trigger, selectedEmails, handleEmailSelect, handleEmailSelectAll } =
    useContext(TriggersCreateContext)

  const emailRows = useMemo<EmailTableType[]>(() => {
    return trigger?.response.emails.map(mapToEmailTable) || []
  }, [trigger])

  return (
    <div className="flex flex-col rounded-[5px] bg-white px-6 py-4">
      <ResponseEmailFilter />
      <div className="primary-body2 mb-2 font-semibold text-functional-text">
        Select Emails
      </div>
      <EmailTable
        rows={emailRows}
        selectedRowIds={selectedEmails}
        onCheckChange={handleEmailSelect}
        showHeaderCheckbox={true}
        onAllCheckChange={handleEmailSelectAll}
      >
        {/**
         * TODO: update the property of email (waiting for API update)
         */}
        <EmailTable.Column label="Email" property="email" />
        <EmailTable.Column label="Note" property="note" />
      </EmailTable>
    </div>
  )
}
