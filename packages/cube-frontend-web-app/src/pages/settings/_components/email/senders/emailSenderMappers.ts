import {
  EmailSenderPatchRequest,
  EmailSenderPostRequest,
  EmailSenderResponse,
} from '@cube-frontend/api'
import { EmailSenderForUi, EmailSenderRow, getRowId } from './emailSendersUtils'

export const emailSenderToRow = (
  emailSender: EmailSenderResponse,
): EmailSenderRow => {
  const emailSenderForUi: EmailSenderForUi = {
    ...emailSender,
    port: emailSender.port.toString(),
    username: emailSender.username ?? '',
    password: '',
  }

  return {
    ...emailSenderForUi,
    status: emailSender.status,
    id: getRowId(),
    originalState: { ...emailSenderForUi },
    isNew: false,
    isEditing: false,
    isVerifying: false,
  }
}

// Credentials are sent only when the relay authenticates. With auth off the
// API never sends them and drops any it has, so leave them out of the request.
const toCredentials = (row: EmailSenderRow) =>
  row.auth ? { username: row.username, password: row.password } : {}

export const rowToEmailSenderPostRequest = (
  row: EmailSenderRow,
): EmailSenderPostRequest => ({
  from: row.from,
  host: row.host,
  port: parseInt(row.port),
  auth: row.auth,
  tls: row.tls,
  ...toCredentials(row),
})

export const rowToEmailSenderPatchRequest = (
  row: EmailSenderRow,
): EmailSenderPatchRequest => ({
  from: row.from,
  host: row.host,
  port: parseInt(row.port),
  auth: row.auth,
  tls: row.tls,
  ...toCredentials(row),
})
