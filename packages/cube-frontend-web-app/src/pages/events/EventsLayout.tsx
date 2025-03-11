import { Link, Outlet, useLocation } from 'react-router'
import { CosTabs } from '@cube-frontend/ui-library'
import { Routes } from '../../enum/routes'

const links = {
  events: Routes.EVENTS_PAGE,
  triggers: Routes.EVENTS_TRIGGERS_PAGE,
  tunings: Routes.EVENTS_TUNINGS_PAGE,
  chart: Routes.EVENTS_CHART_PAGE,
}

export const EventsLayout = () => {
  const location = useLocation()

  return (
    <div>
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
