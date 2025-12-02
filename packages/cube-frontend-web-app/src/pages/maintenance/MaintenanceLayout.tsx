import { Link, Outlet, useLocation } from 'react-router'
import { useTranslation } from 'react-i18next'
import { CosTabs } from '@cube-frontend/ui-library'
import { links } from './links'
import { TopLicenseNagging } from './_components/TopLicenseNagging'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

export const MaintenanceLayout = () => {
  const location = useLocation()

  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-y-4">
      <TopLicenseNagging />
      <CosTabs>
        <Link to={links.supportFiles}>
          <CosTabs.Tab isActive={location.pathname === links.supportFiles}>
            {t('maintenance.supportFiles.title')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.tunings}>
          <CosTabs.Tab isActive={location.pathname === links.tunings}>
            {t('maintenance.tunings.title')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.license}>
          <CosTabs.Tab isActive={location.pathname === links.license}>
            {t('maintenance.license.title')}
          </CosTabs.Tab>
        </Link>
        <Link to={links.updateFirmware}>
          <CosTabs.Tab
            isActive={location.pathname.startsWith(
              CosRoutesEnum.MAINTENANCE_UPDATE_PAGE,
            )}
          >
            {t('maintenance.update.title')}
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
