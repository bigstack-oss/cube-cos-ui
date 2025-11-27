import { Link, Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosTabs } from '@cube-frontend/ui-library'
import { links } from './links'

export const IntegrationsLayout = () => {
  const location = useLocation()

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-4">
      <CosTabs>
        <Link to={links.application}>
          <CosTabs.Tab isActive={location.pathname === links.application}>
            {t('integrations.applications.title')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.storage}>
          <CosTabs.Tab isActive={location.pathname.startsWith(links.storage)}>
            {t('integrations.storages.title')}
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
