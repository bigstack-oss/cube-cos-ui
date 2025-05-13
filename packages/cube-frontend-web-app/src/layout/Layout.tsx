import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router'
import { CosHeader, CosSideBar } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'
import { IntegrationsContext } from '../context/IntegrationsContext'
import { UserContext } from '../context/UserContext'
import { CosRoutesEnum } from '../enum/routes'
import Content from './Content'
import { useFunctionBarItems } from './useFunctionBarItems'
import { useSidebarBottomLinks } from './useSidebarBottomLinks'
import { useSideBarNagging } from './useSideBarNagging'
import { useSidebarOptions } from './useSidebarOptions'
import { IntegrationKey, integrationUIData } from '../utils/integration'

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
      Icon: uiData.Icon,
      hoverMessage: uiData.displayName,
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
