import { EmailRecipientResponse } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { z } from 'zod'

export type EmailRecipientRow = EmailRecipientResponse &
  CosTableRow & {
    originalState: EmailRecipientResponse
    isNew: boolean
    isEditing: boolean
    isTrying: boolean
    isSaving: boolean
    isDeleting: boolean
  }

export const getRowId = (): string => uniqueId('email-recipient')

const createEmailRecipient = (): EmailRecipientResponse => ({
  address: '',
  note: '',
})

export const createNewRow = (): EmailRecipientRow => ({
  ...createEmailRecipient(),
  id: getRowId(),
  originalState: createEmailRecipient(),
  isNew: true,
  isEditing: true,
  isTrying: false,
  isSaving: false,
  isDeleting: false,
})

// TODO: Replace error messages with i18n keys.
export const emailRecipientSchema = z.object({
  address: z.string().email('Invalid email'),
  note: z.string().optional(),
})
