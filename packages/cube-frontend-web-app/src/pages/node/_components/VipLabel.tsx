import { useTranslation } from 'react-i18next'
import { CosIconText } from '@cube-frontend/ui-library'

export const VipLabel = () => {
  const { t } = useTranslation()

  return <CosIconText type="secondary">{t('nodes.vip')}</CosIconText>
}
