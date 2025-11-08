import { GetLicensesTypesEnum } from '@cube-frontend/api'
import { useTranslation } from 'react-i18next'

export const useLicenseTypeTranslations = (): Record<
  GetLicensesTypesEnum,
  string
> => {
  const { t } = useTranslation()

  return {
    trial: t('maintenance.license.type.trial'),
    perpetual: t('maintenance.license.type.perpetual'),
    community: t('maintenance.license.type.community'),
    enterprise: t('maintenance.license.type.enterprise'),
  }
}
