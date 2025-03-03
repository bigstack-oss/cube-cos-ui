import { CosTabs } from '@cube-frontend/ui-library'
import { RouterLink } from '@cube-frontend/web-app/components/RouterLink/RouterLink'
import { Outlet, useLocation } from 'react-router'
import { links } from './links'

export const HomeLayout = () => {
  const location = useLocation()

  return (
    <div>
      <CosTabs>
        <RouterLink href={links.overview}>
          <CosTabs.Tab
            href={links.overview}
            isActive={location.pathname === links.overview}
          >
            Overview
          </CosTabs.Tab>
        </RouterLink>
        <RouterLink href={links.chart}>
          <CosTabs.Tab
            href={links.chart}
            isActive={location.pathname === links.chart}
          >
            Chart
          </CosTabs.Tab>
        </RouterLink>
        <RouterLink href={links.health}>
          <CosTabs.Tab
            href={links.health}
            isActive={location.pathname.startsWith(links.health)}
          >
            Health
          </CosTabs.Tab>
        </RouterLink>
        <RouterLink href={links.manage}>
          <CosTabs.Tab
            href={links.manage}
            isActive={location.pathname === links.manage}
          >
            Manage
          </CosTabs.Tab>
        </RouterLink>
      </CosTabs>
      <Outlet />
    </div>
  )
}
