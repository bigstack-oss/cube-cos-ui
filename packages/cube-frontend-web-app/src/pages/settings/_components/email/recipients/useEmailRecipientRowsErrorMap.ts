import { EmailRecipientResponse } from '@cube-frontend/api'
import { useMemo } from 'react'
import { ErrorRecord, validateBySchema } from '../../validateBySchema'
import { EmailRecipientRow, emailRecipientSchema } from './emailRecipientsUtils'

export type EmailRecipientRowError = ErrorRecord<EmailRecipientResponse>

const computeEmailCountMap = (
  rows: EmailRecipientRow[],
): Map<string, number> => {
  const map = new Map<string, number>()
  rows.forEach((row) => {
    const count = map.get(row.address) ?? 0
    map.set(row.address, count + 1)
  })
  return map
}

export const useEmailRecipientRowsErrorMap = (
  rows: EmailRecipientRow[],
): Map<string, EmailRecipientRowError> => {
  const errorMap = useMemo<Map<string, EmailRecipientRowError>>(() => {
    const emailCountMap = computeEmailCountMap(rows)
    const errorMap = new Map<string, EmailRecipientRowError>()

    rows.forEach((row) => {
      const errorRecord = validateBySchema<EmailRecipientResponse>(
        emailRecipientSchema,
        row,
      )

      const isEmailFormatValid = !errorRecord.address
      if (isEmailFormatValid) {
        // Email format is valid. Proceeding to check for duplicates.
        const sameEmailCount = emailCountMap.get(row.address) ?? 0
        if (sameEmailCount > 1) {
          // TODO: Replace this with i18n key.
          errorRecord.address = 'Duplicate email'
        }
      }

      errorMap.set(row.id, errorRecord)
    })

    return errorMap
  }, [rows])

  return errorMap
}
