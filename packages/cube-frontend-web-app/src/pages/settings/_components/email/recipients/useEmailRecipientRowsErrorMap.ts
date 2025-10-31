import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { ErrorRecord, validateBySchema } from '@cube-frontend/web-app/utils/zod'
import {
  EmailRecipientResponseWithoutStatus,
  EmailRecipientRow,
  useEmailRecipientSchema,
} from './emailRecipientsUtils'

export type EmailRecipientRowError =
  ErrorRecord<EmailRecipientResponseWithoutStatus>

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
  const { t } = useTranslation()

  const emailRecipientSchema = useEmailRecipientSchema()

  const errorMap = useMemo<Map<string, EmailRecipientRowError>>(() => {
    const emailCountMap = computeEmailCountMap(rows)
    const errorMap = new Map<string, EmailRecipientRowError>()

    rows.forEach((row) => {
      const errorRecord = validateBySchema<EmailRecipientResponseWithoutStatus>(
        emailRecipientSchema,
        row,
      )

      const isEmailFormatValid = !errorRecord.address
      if (isEmailFormatValid) {
        // Email format is valid. Proceeding to check for duplicates.
        const sameEmailCount = emailCountMap.get(row.address) ?? 0
        if (sameEmailCount > 1) {
          errorRecord.address = t('settings.emailRecipients.duplicatedEmail')
        }
      }

      errorMap.set(row.id, errorRecord)
    })

    return errorMap
  }, [emailRecipientSchema, rows, t])

  return errorMap
}
