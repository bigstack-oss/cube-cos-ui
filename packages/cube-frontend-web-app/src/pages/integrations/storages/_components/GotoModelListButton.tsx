import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export const GotoModelListButton = () => {
  const { t } = useTranslation()

  return (
    <Link to={CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE}>
      <CosButton type="secondary" usage="text-only" size="sm">
        {t('integrations.storages.modelList')}
      </CosButton>
    </Link>
  )
}
