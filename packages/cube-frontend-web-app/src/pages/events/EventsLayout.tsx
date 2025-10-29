import { useTranslation } from 'react-i18next'
import { Link, Outlet, useLocation } from 'react-router'
import { CosTabs } from '@cube-frontend/ui-library'
import { links } from './links'

export const EventsLayout = () => {
  const location = useLocation()

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-4 px-2 py-1">
      <CosTabs>
        <Link to={links.events}>
          <CosTabs.Tab isActive={location.pathname === links.events}>
            {t('events.tabs.events')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.triggers}>
          <CosTabs.Tab isActive={location.pathname === links.triggers}>
            {t('events.tabs.triggers')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.chart}>
          <CosTabs.Tab isActive={location.pathname === links.chart}>
            {t('events.tabs.chart')}
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
