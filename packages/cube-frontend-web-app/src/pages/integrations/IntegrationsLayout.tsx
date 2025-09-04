import { Link, Outlet, useLocation } from 'react-router'
import { CosTabs } from '@cube-frontend/ui-library'
import { links } from './links'

export const IntegrationsLayout = () => {
  const location = useLocation()
  return (
    <div className="flex flex-col gap-y-4">
      <CosTabs>
        <Link to={links.application}>
          <CosTabs.Tab isActive={location.pathname === links.application}>
            Applications
          </CosTabs.Tab>
        </Link>
        <Link to={links.storage}>
          <CosTabs.Tab isActive={location.pathname.startsWith(links.storage)}>
            Storages
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
