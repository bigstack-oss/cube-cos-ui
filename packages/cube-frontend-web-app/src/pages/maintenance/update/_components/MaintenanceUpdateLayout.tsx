import { CosContentSwitcher, CosGeneralPanel } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'
import dayjs from 'dayjs'
import { ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router'

type MaintenanceUpdateLayoutProps = {
  currentVersion: string
  lastUpdated: string
  children: ReactNode
}

export const MaintenanceUpdateLayout = (
  props: MaintenanceUpdateLayoutProps,
) => {
  const { currentVersion, lastUpdated, children } = props

  const location = useLocation()
  const navigate = useNavigate()

  // TODO: Add support for custom elements (like the <Link> component from react-router) to `CosContentSwitcherItem`
  // for native hyperlink navigation.
  const onContentSwitcherItemClick = (to: string): void => {
    if (location.pathname !== to) {
      navigate(to)
    }
  }

  const formatLastUpdated = (): string => {
    return dayjs.respectTzOffset(lastUpdated).format('YYYY/MM/DD HH:mm A')
  }

  return (
    <div className="flex flex-col gap-y-4">
      <CosGeneralPanel topic={currentVersion}>
        <div className="flex flex-col gap-y-1">
          <div className="primary-body4 text-functional-text-light">
            Last Updated
          </div>
          <div className="primary-h5 text-functional-text">
            {formatLastUpdated()}
          </div>
        </div>
      </CosGeneralPanel>
      <CosContentSwitcher variant="default">
        <CosContentSwitcher.Item
          isActive={
            location.pathname === CosRoutesEnum.MAINTENANCE_UPDATE_FIRMWARE_PAGE
          }
          onClick={() =>
            onContentSwitcherItemClick(
              CosRoutesEnum.MAINTENANCE_UPDATE_FIRMWARE_PAGE,
            )
          }
        >
          Firmware list
        </CosContentSwitcher.Item>
        <CosContentSwitcher.Item
          isActive={
            location.pathname === CosRoutesEnum.MAINTENANCE_UPDATE_FIXPACK_PAGE
          }
          onClick={() =>
            onContentSwitcherItemClick(
              CosRoutesEnum.MAINTENANCE_UPDATE_FIXPACK_PAGE,
            )
          }
        >
          Fixpack list
        </CosContentSwitcher.Item>
      </CosContentSwitcher>
      {children}
    </div>
  )
}
