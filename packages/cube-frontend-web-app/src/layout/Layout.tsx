import { PropsWithChildren } from 'react'
import { CosSideBar, CosSideBarProps } from '@cube-frontend/ui-library'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import Content from './Content'

/**
 * TODO: this sideBarProps should be replaced with the actual API data.
 */
const sideBarProps = {
  dataCenter: {
    name: 'KS',
    version: 'Cube Appliance 2.3.3',
  },
  username: 'Admin',
  options: [
    {
      Icon: HomeIcon,
      label: 'Home',
      isSelected: true,
      onClick: () => {},
    },
    {
      Icon: NodeIcon,
      label: 'Nodes',
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: IntegrationsIcon,
      label: 'Integrations',
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: MaintenanceIcon,
      label: 'Maintenance',
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: EventsIcon,
      label: 'Events',
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: SettingsIcon,
      label: 'Settings',
      isSelected: false,
      onClick: () => {},
    },
  ],
  links: [
    { text: 'CubeCMP', href: '/' },
    { text: 'Help', href: '/' },
  ],
} satisfies CosSideBarProps

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  return (
    <div className="h-svh min-w-full overflow-hidden bg-scene-background">
      <div className="flex h-svh flex-row">
        <CosSideBar {...sideBarProps} />
        <div className="flex-1">
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  )
}

export default Layout
