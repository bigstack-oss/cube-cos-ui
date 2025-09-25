import { SideBarComboboxOptionProps } from '@cube-frontend/ui-library'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import { useLocation, useNavigate } from 'react-router'
import { CosRoutesEnum } from '../enum/routes'
import { useTranslation } from 'react-i18next'

export const useSidebarOptions = (): SideBarComboboxOptionProps[] => {
  const { t } = useTranslation()

  const { pathname } = useLocation()

  const navigate = useNavigate()

  const options: SideBarComboboxOptionProps[] = [
    {
      Icon: HomeIcon,
      label: t('sidebar.home'),
      isSelected: pathname.startsWith(CosRoutesEnum.HOME_PAGE),
      onClick: () => navigate(CosRoutesEnum.HOME_PAGE),
    },
    {
      Icon: NodeIcon,
      label: t('sidebar.nodes'),
      isSelected: pathname.startsWith(CosRoutesEnum.NODES_PAGE),
      onClick: () => navigate(CosRoutesEnum.NODES_PAGE),
    },
    {
      Icon: IntegrationsIcon,
      label: t('sidebar.integrations'),
      isSelected: pathname.startsWith(CosRoutesEnum.INTEGRATIONS_PAGE),
      onClick: () => navigate(CosRoutesEnum.INTEGRATIONS_APPLICATIONS_PAGE),
    },
    {
      Icon: MaintenanceIcon,
      label: t('sidebar.maintenance'),
      isSelected: pathname.startsWith(CosRoutesEnum.MAINTENANCE_PAGE),
      onClick: () => navigate(CosRoutesEnum.MAINTENANCE_SUPPORT_FILES_PAGE),
    },
    {
      Icon: EventsIcon,
      label: t('sidebar.events'),
      isSelected: pathname.startsWith(CosRoutesEnum.EVENTS_PAGE),
      onClick: () => navigate(CosRoutesEnum.EVENTS_PAGE),
    },
    {
      Icon: SettingsIcon,
      label: t('sidebar.settings'),
      isSelected: pathname.startsWith(CosRoutesEnum.SETTINGS_PAGE),
      onClick: () => navigate(CosRoutesEnum.SETTINGS_PAGE),
    },
  ]

  return options
}
