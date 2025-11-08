import { useTranslation } from 'react-i18next'
import { CosButton } from '@cube-frontend/ui-library'

export const TuningsPreviousButton = () => {
  const { t } = useTranslation()

  return (
    <CosButton
      size="md"
      type="ghost"
      usage="text-only"
      onClick={() => history.back()}
      className="w-fit"
    >
      {t('maintenance.tunings.upsert.previous')}
    </CosButton>
  )
}
