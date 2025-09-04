import { CosButton } from '@cube-frontend/ui-library'
import { Link } from 'react-router'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export const GotoModelListButton = () => {
  return (
    <Link to={CosRoutesEnum.INTEGRATIONS_STORAGES_MODELS_PAGE}>
      <CosButton type="secondary" usage="text-only" size="sm">
        Model list
      </CosButton>
    </Link>
  )
}
