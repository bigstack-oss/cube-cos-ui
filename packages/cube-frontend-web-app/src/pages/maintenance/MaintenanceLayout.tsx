import { CosTabs } from '@cube-frontend/ui-library'
import { Link, Outlet, useLocation } from 'react-router'
import { links } from './links'

export const MaintenanceLayout = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col gap-y-4">
      <CosTabs>
        <Link to={links.supportFiles}>
          <CosTabs.Tab isActive={location.pathname === links.supportFiles}>
            Support files
          </CosTabs.Tab>
        </Link>
        <Link to={links.license}>
          <CosTabs.Tab isActive={location.pathname === links.license}>
            License
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
