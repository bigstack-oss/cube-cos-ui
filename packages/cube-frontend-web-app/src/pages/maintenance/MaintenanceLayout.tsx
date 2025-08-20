import { Link, Outlet, useLocation } from 'react-router'
import { CosTabs } from '@cube-frontend/ui-library'
import { links } from './links'
import { TopLicenseNagging } from './_components/TopLicenseNagging'

export const MaintenanceLayout = () => {
  const location = useLocation()
  return (
    <div className="flex flex-col gap-y-4">
      <TopLicenseNagging />
      <CosTabs>
        <Link to={links.supportFiles}>
          <CosTabs.Tab isActive={location.pathname === links.supportFiles}>
            Support files
          </CosTabs.Tab>
        </Link>
        <Link to={links.tunings}>
          <CosTabs.Tab isActive={location.pathname === links.tunings}>
            Tunings
          </CosTabs.Tab>
        </Link>
        <Link to={links.license}>
          <CosTabs.Tab isActive={location.pathname === links.license}>
            License
          </CosTabs.Tab>
        </Link>
        <Link to={links.updateFirmware}>
          <CosTabs.Tab isActive={location.pathname === links.updateFirmware}>
            Update
          </CosTabs.Tab>
        </Link>
      </CosTabs>
      <Outlet />
    </div>
  )
}
