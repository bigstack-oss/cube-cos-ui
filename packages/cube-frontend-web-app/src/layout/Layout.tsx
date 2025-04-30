import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router'
import { CosHeader, CosSideBar } from '@cube-frontend/ui-library'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keycloak.svg?react'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import { logoutApi } from '../api/cosApi'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'
import { DataCenterContext } from '../context/DataCenterContext'
import { IntegrationsContext } from '../context/IntegrationsContext'
import { UserContext } from '../context/UserContext'
import Content from './Content'
import { useSidebarOptions } from './useSidebarOptions'
import { useSidebarBottomLinks } from './useSidebarBottomLinks'
import { useSideBarNagging } from './useSideBarNagging'
import { CosRoutesEnum } from '../enum/routes'

const integrationIcons = {
  keycloak: KeycloakIcon,
  ceph: CephIcon,
  openstack: OpenStackIcon,
  rancher: RancherIcon,
}

const integrationTooltipMap: Record<keyof typeof integrationIcons, string> = {
  keycloak: 'Keycloak',
  ceph: 'Ceph',
  openstack: 'OpenStack',
  rancher: 'Rancher',
}

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const sideBarOptions = useSidebarOptions()

  const sideBarBottomLinks = useSidebarBottomLinks()

  const handleLogout = () => {
    logoutApi.logout()
  }

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { userInfo, isLoading: isUserInfoLoading } = useContext(UserContext)

  const { integrations, isLoading: isIntegrationsLoading } =
    useContext(IntegrationsContext)

  const sideBarNaggingProps = useSideBarNagging(
    dataCenter?.additional.nodeLicenseStatus,
  )

  const quickAccesses = integrations.map((integration) => {
    const key = integration.name as keyof typeof integrationIcons
    const Icon = integrationIcons[key]
    if (!Icon) {
      console.warn(`No icon found for integration: ${integration.name}`)
    }

    return {
      Icon,
      href: integration.url,
      hoverMessage: integrationTooltipMap[key],
    }
  })

  return (
    <div className="h-svh min-w-full overflow-hidden bg-scene-background">
      <div className="flex h-svh flex-row">
        <CosSideBar
          LogoContainer={<Link to={CosRoutesEnum.HOME_PAGE} />}
          isLoading={isDataCenterLoading || isUserInfoLoading}
          dataCenter={dataCenter}
          naggingProps={sideBarNaggingProps}
          username={userInfo?.name}
          options={sideBarOptions}
          links={sideBarBottomLinks}
        />
        <div className="max-w-[calc(100svw_-_200px)] flex-1">
          <CosHeader
            isLoading={isIntegrationsLoading}
            quickAccesses={quickAccesses}
            notificationContainer={<Link to={CosRoutesEnum.EVENTS_PAGE} />}
            onLogout={handleLogout}
          />
          {/**
           * Only render <Content> when `dataCenter` is available,
           * ensuring it always has access to a valid `dataCenter` value.
           */}
          {dataCenter && <Content>{children}</Content>}
        </div>
      </div>
    </div>
  )
}

export default Layout
