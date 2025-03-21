import { CosTabs } from '@cube-frontend/ui-library'
import { Link, Outlet, useLocation } from 'react-router'
import { links } from './links'

export const EventsLayout = () => {
  const location = useLocation()

  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <CosTabs>
        <Link to={links.events}>
          <CosTabs.Tab isActive={location.pathname === links.events}>
            Events
          </CosTabs.Tab>
        </Link>
        <Link to={links.triggers}>
          <CosTabs.Tab isActive={location.pathname === links.triggers}>
            Triggers
          </CosTabs.Tab>
        </Link>
        <Link to={links.tunings}>
          <CosTabs.Tab isActive={location.pathname === links.tunings}>
            Tunings
          </CosTabs.Tab>
        </Link>
        <Link to={links.chart}>
          <CosTabs.Tab isActive={location.pathname === links.chart}>
            Chart
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
