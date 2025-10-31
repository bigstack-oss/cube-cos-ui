import {
  EmailRecipientResponse,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'
import { uniqueId } from 'lodash'
import { useTranslation } from 'react-i18next'
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

export const useEmailRecipientSchema = () => {
  const { t } = useTranslation()

  return z.object({
    address: z.string().email(t('settings.emailRecipients.invalidEmail')),
    note: z.string().optional(),
  })
}
