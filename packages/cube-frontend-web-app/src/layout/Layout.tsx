import { PropsWithChildren } from 'react'
import {
  CosSideBar,
  CosSideBarProps,
  CosHeader,
} from '@cube-frontend/ui-library'
import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'
import { logoutApi } from '@cube-frontend/api'
import Content from './Content'

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

// const quickAccessIcons = {
//   keycloak: KeycloakIcon,
//   ceph: CephIcon,
//   openstack: OpenStackIcon,
//   rancher: RancherIcon,
// }

// const integrations = useContext(IntegrationsContext)

// const quickAccesses = integrations.map((integration) => {
//   const Icon =
//     quickAccessIcons[integration.name as keyof typeof quickAccessIcons]
//   if (!Icon) {
//     console.warn(`Integration icon not found for ${integration.name}`)
//   }

//   return { Icon, href: integration.url }
// })

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const quickAccesses = [
    { Icon: KeycloakIcon, href: '/' },
    { Icon: CephIcon, href: '/' },
    { Icon: OpenStackIcon, href: '/' },
    { Icon: RancherIcon, href: '/' },
  ]

  const handleLogout = () => logoutApi.logout()

  return (
    <div className="h-svh min-w-full overflow-hidden bg-scene-background">
      <div className="flex h-svh flex-row">
        <CosSideBar {...sideBarProps} />
        <div className="flex-1">
          <CosHeader quickAccesses={quickAccesses} onLogout={handleLogout} />
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  )
}

export default Layout
