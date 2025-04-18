import {
  EmailRecipientResponse,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { z } from 'zod'

export type EmailRecipientResponseWithoutStatus = Omit<
  EmailRecipientResponse,
  'status'
>

export type EmailRecipientRow = EmailRecipientResponse &
  CosTableRow & {
    originalState: EmailRecipientResponseWithoutStatus
    isNew: boolean
    isEditing: boolean
    isTrying: boolean
    isDeleting: boolean
  }

export const getRowId = (): string => uniqueId('email-recipient')

const createEmailRecipient = (): EmailRecipientResponse => ({
  address: '',
  note: '',
  status: {
    current: SettingStatusCurrentEnum.Ok,
    isUpdating: false,
  },
})

export const createNewRow = (): EmailRecipientRow => {
  const defaultData = createEmailRecipient()
  return {
    ...defaultData,
    id: getRowId(),
    originalState: {
      address: defaultData.address,
      note: defaultData.note,
    },
    isNew: true,
    isEditing: true,
    isTrying: false,
    isDeleting: false,
  }
}

// TODO: Replace error messages with i18n keys.
export const emailRecipientSchema = z.object({
  address: z.string().email('Invalid email'),
  note: z.string().optional(),
})
