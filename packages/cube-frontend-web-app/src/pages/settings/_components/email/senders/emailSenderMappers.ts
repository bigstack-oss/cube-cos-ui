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

export const rowToEmailSenderPostRequest = (
  row: EmailSenderRow,
): EmailSenderPostRequest => ({
  from: row.from,
  host: row.host,
  port: parseInt(row.port),
  username: row.username,
  password: row.password,
})

export const rowToEmailSenderPatchRequest = (
  row: EmailSenderRow,
): EmailSenderPatchRequest => {
  const request: EmailSenderPatchRequest = {
    from: row.from,
    host: row.host,
    port: parseInt(row.port),
    username: row.username,
  }

  /**
   * Conditionally put the `password` field in the patch request:
   * - If no password is provided, omit the `password` key to avoid unnecessary updates.
   * - If a new password is provided, include it in the patch request payload.
   */
  if (row.password) {
    request.password = row.password
  }

  return request
}
