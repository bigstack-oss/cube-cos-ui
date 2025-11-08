import { useTranslation } from 'react-i18next'
import { CosIconText } from '@cube-frontend/ui-library'
import { getLicenseExpiryStatus } from './utils'

export type ExpiryIconTextProps = {
  expiryDays: number
}

export const ExpiryIconText = (props: ExpiryIconTextProps) => {
  const { expiryDays } = props

  const { t } = useTranslation()

  const expiryStatus = getLicenseExpiryStatus(expiryDays)
  const expiryStatusDisplay = {
    expired: () => (
      <CosIconText type="error">{t('maintenance.license.expired')}</CosIconText>
    ),
    expiring: () => (
      <CosIconText type="warning">
        {t('maintenance.license.expiring')}
      </CosIconText>
    ),
    valid: () => null,
  }

  return expiryStatusDisplay[expiryStatus]()
}
