import { useTranslation } from 'react-i18next'
import { uniqueId } from 'lodash'
import { z } from 'zod'
import {
  EmailSenderResponse,
  SettingStatus,
  SettingStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type EmailSenderRow = EmailSenderForUi &
  CosTableRow & {
    originalState: EmailSenderForUi
    status: SettingStatus
    isNew: boolean
    isEditing: boolean
    isVerifying: boolean
  }

export type EmailSenderForUi = Omit<EmailSenderResponse, 'port' | 'status'> & {
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
  from: '',
  accessVerified: false,
})

export const createNewRow = (): EmailSenderRow => ({
  ...createEmailSender(),
  id: getRowId(),
  originalState: createEmailSender(),
  status: {
    current: SettingStatusCurrentEnum.Ok,
    isUpdating: false,
  },
  isNew: true,
  // Normally, a new row should start in editing mode.
  // But in phase 1, users are not allowed to add new email senders directly.
  // Instead, a placeholder row appears in the table, and users must click the
  // edit button to modify it.
  // So for now, `isEditing` is `false` by default, and should be changed to
  // `true` once multiple email senders are supported.
  isEditing: false,
  isVerifying: false,
})

export const useEmailSenderSchema = () => {
  const { t } = useTranslation()

  return z.object({
    host: z.string().min(1, t('settings.emailSender.hostCantBeEmpty')),
    port: z
      .string()
      .regex(/^\d+$/, t('settings.emailSender.invalidPortNumber')),
    username: z.string().min(1, t('settings.emailSender.usernameCantBeEmpty')),
    password: z.string().optional(),
    from: z.string().email(t('settings.emailSender.invalidFromEmail')),
    isNew: z.boolean(),
  })
}
