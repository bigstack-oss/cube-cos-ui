import { EmailSenderPostRequest } from '@cube-frontend/api'
import { useMemo } from 'react'
import { ErrorRecord, validateBySchema } from '../../validateBySchema'
import {
  EmailSenderForUi,
  EmailSenderRow,
  emailSenderSchema,
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
  const errorMap = useMemo<Map<string, EmailSenderRowError>>(() => {
    const hostMap = computeHostMap(rows)
    const errorMap = new Map<string, EmailSenderRowError>()

    rows.forEach((row) => {
      const errorRecord = validateBySchema<
        Omit<EmailSenderForUi, 'accessVerified'>
      >(emailSenderSchema, row)

      // Currently, the backend uses `host` as the key rather than `host:port`.
      const isHostFormatValid = !errorRecord.host
      if (isHostFormatValid) {
        // Host format is valid. Proceeding to check for duplicates.
        const sameHostCount = hostMap.get(row.host) ?? 0
        if (sameHostCount > 1) {
          // TODO: Replace this with i18n key.
          errorRecord.host = 'Duplicate host'
        }
      }

      errorMap.set(row.id, errorRecord)
    })

    return errorMap
  }, [rows])

  return errorMap
}
