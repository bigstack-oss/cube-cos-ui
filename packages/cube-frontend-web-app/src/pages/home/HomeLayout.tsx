import { CosTabs } from '@cube-frontend/ui-library'
import { Link, Outlet, useLocation } from 'react-router'
import { links } from './links'

export const HomeLayout = () => {
  const location = useLocation()

  return (
    <div>
      <CosTabs>
        <Link to={links.overview}>
          <CosTabs.Tab isActive={location.pathname === links.overview}>
            Overview
          </CosTabs.Tab>
        </Link>
        <Link to={links.chart}>
          <CosTabs.Tab isActive={location.pathname === links.chart}>
            Chart
          </CosTabs.Tab>
        </Link>
        <Link to={links.health}>
          <CosTabs.Tab isActive={location.pathname.startsWith(links.health)}>
            Health
          </CosTabs.Tab>
        </Link>
        <Link to={links.manage}>
          <CosTabs.Tab isActive={location.pathname === links.manage}>
            Manage
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
