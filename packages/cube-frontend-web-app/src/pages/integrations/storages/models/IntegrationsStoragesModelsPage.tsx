import { Link } from 'react-router'
import { CosBackButton } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import { StoragesModelsPanel } from './_components/StoragesModelsPanel'

export const IntegrationsStoragesModelsPage = () => {
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
        Model list
      </CosBackButton>
      <StoragesModelsPanel />
    </div>
  )
}
