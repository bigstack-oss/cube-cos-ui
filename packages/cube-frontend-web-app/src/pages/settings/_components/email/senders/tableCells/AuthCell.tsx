import { useTranslation } from 'react-i18next'
import { CosToggle } from '@cube-frontend/ui-library'
import { EmailSenderForUi, EmailSenderRow } from '../emailSendersUtils'

type AuthCellProps = {
  row: EmailSenderRow
  onFieldChange: (payload: Partial<EmailSenderForUi>) => void
}

export const AuthCell = (props: AuthCellProps) => {
  const { row, onFieldChange } = props

  const { t } = useTranslation()

  const {
    auth,
    isNew,
    isEditing,
    status: { isUpdating },
  } = row

  if (!isEditing) {
    if (isNew) {
      return ''
    }
    return auth
      ? t('settings.emailSender.auth.on')
      : t('settings.emailSender.auth.off')
  }

  return (
    <CosToggle
      isOn={auth}
      disabled={isUpdating}
      onChange={(isOn) => onFieldChange({ auth: isOn })}
    />
  )
}
