import { useContext, useMemo } from 'react'
import { GetTriggersResponseDataInnerResponseEmailsInner } from '@cube-frontend/api'
import { CosTableRow, GetCosBatchActionTable } from '@cube-frontend/ui-library'
import { ResponseEmailFilter } from './ResponseEmailFilter'
import { TriggersCreateContext } from '../../create/context'

type EmailTableType = GetTriggersResponseDataInnerResponseEmailsInner &
  CosTableRow

const EmailTable = GetCosBatchActionTable<EmailTableType>()

const mapToEmailTable = (
  email: GetTriggersResponseDataInnerResponseEmailsInner,
): EmailTableType => ({
  ...email,
  /**
   * We use the email address as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: email.address,
})

export const ResponseEmailTable = () => {
  const { formOptions, formValue, handleEmailSelect, handleEmailSelectAll } =
    useContext(TriggersCreateContext)

  const { allEmails } = formOptions

  const { formEmails } = formValue

  const emailRows = useMemo<EmailTableType[]>(() => {
    return allEmails.map(mapToEmailTable) || []
  }, [allEmails])

  return (
    <div className="flex flex-col rounded-[5px] bg-white px-6 py-4">
      <ResponseEmailFilter />
      <div className="primary-body2 mb-2 font-semibold text-functional-text">
        Select Emails
      </div>
      <EmailTable
        rows={emailRows}
        selectedRowIds={formEmails}
        onCheckChange={handleEmailSelect}
        showHeaderCheckbox={true}
        onAllCheckChange={handleEmailSelectAll}
      >
        <EmailTable.Column label="Email" property="address" />
        <EmailTable.Column label="Note" property="note" />
      </EmailTable>
    </div>
  )
}
