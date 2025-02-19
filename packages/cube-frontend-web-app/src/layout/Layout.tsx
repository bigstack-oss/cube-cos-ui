import { PropsWithChildren, useContext } from 'react'
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
import Content from './Content'
import { DataCenterContext } from '../context/DataCenterContext'
import { UserContext } from '../context/UserContext'
import { IntegrationsContext } from '../context/IntegrationsContext'
import { logoutApi } from '../api/cosApi'

const sideBarOptions = [
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
] satisfies CosSideBarProps['options']

const integrationIcons = {
  keycloak: KeycloakIcon,
  ceph: CephIcon,
  openstack: OpenStackIcon,
  rancher: RancherIcon,
}

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const handleLogout = () => {
    logoutApi.logout()
  }

  const dataCenter = useContext(DataCenterContext)
  const user = useContext(UserContext)
  const integrations = useContext(IntegrationsContext)

  const quickAccesses = integrations.map((integration) => {
    const Icon =
      integrationIcons[integration.name as keyof typeof integrationIcons]
    if (!Icon) {
      console.warn(`No icon found for integration: ${integration.name}`)
    }

    return { Icon, href: integration.url }
  })
  return (
    <div className="h-svh min-w-full overflow-hidden bg-scene-background">
      <div className="flex h-svh flex-row">
        <CosSideBar
          dataCenter={dataCenter}
          username={user.name}
          options={sideBarOptions}
        />
        <div className="max-w-[calc(100svw_-_200px)] flex-1">
          <CosHeader quickAccesses={quickAccesses} onLogout={handleLogout} />
          <Content>{children}</Content>
        </div>
      </div>
    </div>
  )
}

export default Layout
