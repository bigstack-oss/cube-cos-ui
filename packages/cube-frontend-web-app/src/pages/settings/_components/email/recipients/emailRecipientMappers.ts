import {
  EmailRecipientPostRequest,
  EmailRecipientPutRequest,
  EmailRecipientResponse,
} from '@cube-frontend/api'
import { EmailRecipientRow, getRowId } from './emailRecipientsUtils'

export const emailRecipientToRow = (
  emailRecipient: EmailRecipientResponse,
): EmailRecipientRow => ({
  address: emailRecipient.address,
  note: emailRecipient.note,
  status: emailRecipient.status,
  id: getRowId(),
  originalState: {
    address: emailRecipient.address,
    note: emailRecipient.note,
  },
  isNew: false,
  isEditing: false,
  isTrying: false,
  isDeleting: false,
})

export const rowToEmailPostRequest = (
  row: EmailRecipientRow,
): EmailRecipientPostRequest => ({
  address: row.address,
  note: row.note,
})

export const rowToEmailPutRequest = (
  row: EmailRecipientRow,
): EmailRecipientPutRequest => ({
  address: row.address,
  note: row.note,
})
