import { CosHeader, CosSideBar } from '@cube-frontend/ui-library'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'
import { PropsWithChildren, useContext } from 'react'
import { logoutApi } from '../api/cosApi'
import { DataCenterContext } from '../context/DataCenterContext'
import { IntegrationsContext } from '../context/IntegrationsContext'
import { UserContext } from '../context/UserContext'
import Content from './Content'
import { useSidebarOptions } from './useSidebarOptions'

const integrationIcons = {
  keycloak: KeycloakIcon,
  ceph: CephIcon,
  openstack: OpenStackIcon,
  rancher: RancherIcon,
}

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const sideBarOptions = useSidebarOptions()

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
