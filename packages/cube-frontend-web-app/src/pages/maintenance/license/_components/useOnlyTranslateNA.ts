import { useTranslation } from 'react-i18next'

/**
 * License support plan and quantity may have value 'N/A' which needs translation.
 */
export const useOnlyTranslateNA = () => {
  const { t } = useTranslation()

  const onlyTranslateNA = (value: string) =>
    value === 'N/A' ? t('maintenance.license.na') : value

  return onlyTranslateNA
}
