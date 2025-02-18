import { SideBarComboboxOptionProps } from '@cube-frontend/ui-library'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import { useLocation, useNavigate } from 'react-router'

export const useSidebarOptions = (): SideBarComboboxOptionProps[] => {
  const { pathname } = useLocation()

  const navigate = useNavigate()

  const options: SideBarComboboxOptionProps[] = [
    {
      Icon: HomeIcon,
      label: 'Home',
      isSelected: pathname.startsWith('/home'),
      onClick: () => navigate('/home'),
    },
    {
      Icon: NodeIcon,
      label: 'Nodes',
      isSelected: pathname.startsWith('/nodes'),
      onClick: () => navigate('/nodes'),
    },
    {
      Icon: IntegrationsIcon,
      label: 'Integrations',
      isSelected: pathname.startsWith('/integrations'),
      onClick: () => navigate('/integrations'),
    },
    {
      Icon: MaintenanceIcon,
      label: 'Maintenance',
      isSelected: pathname.startsWith('/maintenance'),
      onClick: () => navigate('/maintenance'),
    },
    {
      Icon: EventsIcon,
      label: 'Events',
      isSelected: pathname.startsWith('/events'),
      onClick: () => navigate('/events'),
    },
    {
      Icon: SettingsIcon,
      label: 'Settings',
      isSelected: pathname.startsWith('/settings'),
      onClick: () => navigate('/settings'),
    },
  ]

  return options
}
