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
): EmailSenderPatchRequest => ({
  from: row.from,
  host: row.host,
  port: parseInt(row.port),
  username: row.username,
  password: row.password,
})
