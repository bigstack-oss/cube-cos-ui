import { SideBarComboboxOptionProps } from '@cube-frontend/ui-library'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import { useLocation, useNavigate } from 'react-router'
import { CosRoutesEnum } from '../enum/routes'
// import { useContext } from 'react'
// import { GlobalSearchContext } from '../context/GlobalSearchContext'

export const useSidebarOptions = (): SideBarComboboxOptionProps[] => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  // const { keyword, setKeyword, clearKeyword } = useContext(GlobalSearchContext)

  const options: SideBarComboboxOptionProps[] = [
    {
      Icon: HomeIcon,
      label: 'Home',
      isSelected: pathname.startsWith(CosRoutesEnum.HOME_PAGE),
      onClick: () => navigate(CosRoutesEnum.HOME_PAGE),
    },
    {
      Icon: NodeIcon,
      label: 'Nodes',
      isSelected: pathname.startsWith(CosRoutesEnum.NODES_PAGE),
      onClick: () => navigate(CosRoutesEnum.NODES_PAGE),
    },
    {
      Icon: IntegrationsIcon,
      label: 'Integrations',
      isSelected: pathname.startsWith(CosRoutesEnum.INTEGRATIONS_PAGE),
      onClick: () => navigate(CosRoutesEnum.INTEGRATIONS_APPLICATIONS_PAGE),
    },
    {
      Icon: MaintenanceIcon,
      label: 'Maintenance',
      isSelected: pathname.startsWith(CosRoutesEnum.MAINTENANCE_PAGE),
      onClick: () => navigate(CosRoutesEnum.MAINTENANCE_SUPPORT_FILES_PAGE),
    },
    {
      Icon: EventsIcon,
      label: 'Events',
      isSelected: pathname.startsWith(CosRoutesEnum.EVENTS_PAGE),
      onClick: () => navigate(CosRoutesEnum.EVENTS_PAGE),
    },
    {
      Icon: SettingsIcon,
      label: 'Settings',
      isSelected: pathname.startsWith(CosRoutesEnum.SETTINGS_PAGE),
      onClick: () => navigate(CosRoutesEnum.SETTINGS_PAGE),
    },
  ]

  return options
}
