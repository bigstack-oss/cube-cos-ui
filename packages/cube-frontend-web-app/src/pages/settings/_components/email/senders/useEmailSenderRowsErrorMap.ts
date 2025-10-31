import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { EmailSenderPostRequest } from '@cube-frontend/api'
import { ErrorRecord, validateBySchema } from '@cube-frontend/web-app/utils/zod'
import {
  EmailSenderForUi,
  EmailSenderRow,
  useEmailSenderSchema,
} from './emailSendersUtils'

export type EmailSenderRowError = ErrorRecord<EmailSenderPostRequest>

const computeHostMap = (rows: EmailSenderRow[]): Map<string, number> => {
  const map = new Map<string, number>()
  rows.forEach((row) => {
    const count = map.get(row.host) ?? 0
    map.set(row.host, count + 1)
  })
  return map
}

export const useEmailSenderRowsErrorMap = (
  rows: EmailSenderRow[],
): Map<string, EmailSenderRowError> => {
  const { t } = useTranslation()

  const emailSenderSchema = useEmailSenderSchema()

  const errorMap = useMemo<Map<string, EmailSenderRowError>>(() => {
    const hostMap = computeHostMap(rows)
    const errorMap = new Map<string, EmailSenderRowError>()

    rows.forEach((row) => {
      const errorRecord = validateBySchema<
        Omit<EmailSenderForUi, 'accessVerified' | 'status'>
      >(emailSenderSchema, row)

      // Currently, the backend uses `host` as the key rather than `host:port`.
      const isHostFormatValid = !errorRecord.host
      if (isHostFormatValid) {
        // Host format is valid. Proceeding to check for duplicates.
        const sameHostCount = hostMap.get(row.host) ?? 0
        if (sameHostCount > 1) {
          errorRecord.host = t('settings.emailSender.duplicatedHost')
        }
      }

      errorMap.set(row.id, errorRecord)
    })

    return errorMap
  }, [emailSenderSchema, rows, t])

  return errorMap
}
