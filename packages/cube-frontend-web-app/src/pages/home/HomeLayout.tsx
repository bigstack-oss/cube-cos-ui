import { CosTabs } from '@cube-frontend/ui-library'
import { Link, Outlet, useLocation } from 'react-router'
import { links } from './links'
import { useTranslation } from 'react-i18next'

export const HomeLayout = () => {
  const location = useLocation()
  const { t } = useTranslation()

  return (
    <div>
      <CosTabs>
        <Link to={links.overview}>
          <CosTabs.Tab isActive={location.pathname === links.overview}>
            {t('home.tabs.overview')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.chart}>
          <CosTabs.Tab isActive={location.pathname === links.chart}>
            {t('home.tabs.chart')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.health}>
          <CosTabs.Tab isActive={location.pathname.startsWith(links.health)}>
            {t('home.tabs.health')}
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
