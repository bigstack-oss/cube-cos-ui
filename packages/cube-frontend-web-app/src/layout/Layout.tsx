import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router'
import { CosHeader, CosSideBar } from '@cube-frontend/ui-library'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keycloak.svg?react'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'
import { DataCenterContext } from '../context/DataCenterContext'
import { IntegrationsContext } from '../context/IntegrationsContext'
import { UserContext } from '../context/UserContext'
import Content from './Content'
import { useSidebarOptions } from './useSidebarOptions'
import { useSidebarBottomLinks } from './useSidebarBottomLinks'
import { useSideBarNagging } from './useSideBarNagging'
import { CosRoutesEnum } from '../enum/routes'
import { useFunctionBarItems } from './useFunctionBarItems'

const integrationUIData = {
  keycloak: {
    Icon: KeycloakIcon,
    hoverMessage: 'Keycloak',
  },
  ceph: {
    Icon: CephIcon,
    hoverMessage: 'Ceph',
  },
  openstack: {
    Icon: OpenStackIcon,
    hoverMessage: 'OpenStack',
  },
  rancher: {
    Icon: RancherIcon,
    hoverMessage: 'Rancher',
  },
} as const

type IntegrationKey = keyof typeof integrationUIData

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const sideBarOptions = useSidebarOptions()

  const sideBarBottomLinks = useSidebarBottomLinks()

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { userInfo, isLoading: isUserInfoLoading } = useContext(UserContext)

  const { integrations, isLoading: isIntegrationsLoading } =
    useContext(IntegrationsContext)

  const sideBarNaggingProps = useSideBarNagging(
    dataCenter?.additional.nodeLicenseStatus,
  )

  const quickAccesses = integrations.map((integration) => {
    const key = integration.name as IntegrationKey
    const uiData = integrationUIData[key]

    if (!uiData) {
      console.warn(`No UI data is defined for integration: ${integration.name}`)
    }

    return {
      ...uiData,
      href: integration.url,
    }
  })

  const functionBarItems = useFunctionBarItems()

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
          utcTimeZone={dataCenter?.utcTimeZone}
          links={sideBarBottomLinks}
        />
        <div className="max-w-[calc(100svw_-_200px)] flex-1">
          <CosHeader
            isLoading={isIntegrationsLoading}
            quickAccesses={quickAccesses}
            functionBarItems={functionBarItems}
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
