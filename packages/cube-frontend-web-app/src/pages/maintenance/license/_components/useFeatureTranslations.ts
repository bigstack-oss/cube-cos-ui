import { useTranslation } from 'react-i18next'
import { LicenseFeature } from '@cube-frontend/api'

export const useFeatureTranslations = () => {
  const { t } = useTranslation()

  const featureTranslations: Record<LicenseFeature, string> = {
    'N/A': t('maintenance.license.feature.na'),
    basic: t('maintenance.license.feature.basic'),
    advanced: t('maintenance.license.feature.advanced'),
    premium: t('maintenance.license.feature.premium'),
  }

  return featureTranslations
}
