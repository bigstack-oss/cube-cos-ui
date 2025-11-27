import { Link } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { StoragesModelsPanel } from './_components/StoragesModelsPanel'

export const IntegrationsStoragesModelsPage = () => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-4">
      <CosBackButton
        backButtonContainer={{
          Component: Link,
          props: {
            to: CosRoutesEnum.INTEGRATIONS_STORAGES_PAGE,
          },
        }}
      >
        {t('integrations.modelList.title')}
      </CosBackButton>
      <StoragesModelsPanel />
    </div>
  )
}
