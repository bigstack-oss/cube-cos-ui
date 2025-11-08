import { NodeLicenseCurrentStatus } from '@cube-frontend/api'
import { useTranslation } from 'react-i18next'

export const useNodeLicenseStatusTranslations = (): Record<
  NodeLicenseCurrentStatus,
  string
> => {
  const { t } = useTranslation()

  return {
    valid: t('maintenance.license.nodeStatus.valid'),
    expired: t('maintenance.license.nodeStatus.expired'),
    unlicense: t('maintenance.license.nodeStatus.unlicense'),
  }
}
