import { EmailSenderResponse } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { z } from 'zod'

export type EmailSenderRow = EmailSenderForUi &
  CosTableRow & {
    originalState: EmailSenderForUi
    isNew: boolean
    isEditing: boolean
    isSaving: boolean
    isVerifying: boolean
  }

export type EmailSenderForUi = Omit<EmailSenderResponse, 'port'> & {
  // Use string instead of number for `port` in the UI to simplify form validation
  // and allow an empty string for the placeholder row.
  port: string
  password: string
}

export const getRowId = (): string => uniqueId('email-sender')

const createEmailSender = (): EmailSenderForUi => ({
  host: '',
  port: '',
  username: '',
  password: '',
  email: '',
  accessVerified: false,
})

export const createNewRow = (): EmailSenderRow => ({
  ...createEmailSender(),
  id: getRowId(),
  originalState: createEmailSender(),
  isNew: true,
  // Normally, a new row should start in editing mode.
  // But in phase 1, users are not allowed to add new email senders directly.
  // Instead, a placeholder row appears in the table, and users must click the
  // edit button to modify it.
  // So for now, `isEditing` is `false` by default, and should be changed to
  // `true` once multiple email senders are supported.
  isEditing: false,
  isSaving: false,
  isVerifying: false,
})

// TODO: Replace error messages with i18n keys.
export const emailSenderSchema = z
  .object({
    host: z.string().min(1, 'Host cannot be empty'),
    port: z.string().regex(/^\d+$/, 'Invalid port number'),
    username: z.string().min(1, 'Username cannot be empty'),
    password: z.string().optional(),
    email: z.string().email('Invalid email'),
    isNew: z.boolean(),
  })
  .refine(
    (row) => {
      if (!row.isNew) {
        // Password field is optional for existing email senders.
        return true
      }
      return !!row.password
    },
    {
      path: ['password'],
      message: 'Password cannot be empty',
    },
  )
