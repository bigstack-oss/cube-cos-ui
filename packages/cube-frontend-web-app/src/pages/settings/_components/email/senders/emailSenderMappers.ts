import {
  EmailSenderPostRequest,
  EmailSenderPutRequest,
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
    id: getRowId(),
    originalState: { ...emailSenderForUi },
    isNew: false,
    isEditing: false,
    isSaving: false,
    isVerifying: false,
  }
}

export const rowToEmailSenderPostRequest = (
  row: EmailSenderRow,
): EmailSenderPostRequest => ({
  email: row.email,
  host: row.host,
  port: parseInt(row.port),
  username: row.username,
  password: row.password,
})

export const rowToEmailSenderPutRequest = (
  row: EmailSenderRow,
): EmailSenderPutRequest => ({
  email: row.email,
  host: row.host,
  port: parseInt(row.port),
  username: row.username,
  password: row.password || undefined,
})
