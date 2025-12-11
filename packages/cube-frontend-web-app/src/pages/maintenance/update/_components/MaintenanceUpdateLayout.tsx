import { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useNavigate } from 'react-router'
import dayjs from 'dayjs'
import { CosContentSwitcher, CosGeneralPanel } from '@cube-frontend/ui-library'
import { CosRoutesEnum } from '@cube-frontend/web-app/enum/routes'

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

  const { t, i18n } = useTranslation()

  // TODO: Add support for custom elements (like the <Link> component from react-router) to `CosContentSwitcherItem`
  // for native hyperlink navigation.
  const onContentSwitcherItemClick = (to: string): void => {
    if (location.pathname !== to) {
      navigate(to)
    }
  }

  const formatLastUpdated = (): string => {
    if (!lastUpdated) return t('maintenance.update.never')
    return dayjs
      .respectTzOffset(lastUpdated)
      .locale(i18n.language)
      .format('YYYY/MM/DD HH:mm A')
  }

  return (
    <div className="flex flex-col gap-y-4">
      <CosGeneralPanel topic={currentVersion}>
        <div className="flex flex-col gap-y-1">
          <div className="primary-body4 text-functional-text-light">
            {t('maintenance.update.lastUpdated')}
          </div>
          <div className="primary-h5 text-functional-text">
            {formatLastUpdated()}
          </div>
        </div>
      </CosGeneralPanel>
      <CosContentSwitcher variant="default" size="md">
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
          {t('maintenance.update.firmware.firmwareList')}
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
          {t('maintenance.update.fixpack.fixpackList')}
        </CosContentSwitcher.Item>
      </CosContentSwitcher>
      {children}
    </div>
  )
}
