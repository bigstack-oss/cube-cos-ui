import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router'
import { CosHeader, CosSideBar } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'
import { ApplicationIntegrationsContext } from '../context/ApplicationIntegrationsContext'
import { UserContext } from '../context/UserContext'
import { CosRoutesEnum } from '../enum/routes'
import Content from './Content'
import { useFunctionBarItems } from './useFunctionBarItems'
import { useSidebarBottomLinks } from './useSidebarBottomLinks'
import { useSideBarNagging } from './useSideBarNagging'
import { useSidebarOptions } from './useSidebarOptions'
import {
  ApplicationIntegrationKey,
  applicationIntegrationUIData,
} from '../utils/applicationIntegration'
import { usePollNotifications } from '../hooks/usePollNotifications/usePollNotifications'
import { GlobalSearchContext } from '../context/GlobalSearchContext'
import { SearchPage } from './SearchPage'

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const sideBarOptions = useSidebarOptions()

  const sideBarBottomLinks = useSidebarBottomLinks()

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { userInfo, isLoading: isUserInfoLoading } = useContext(UserContext)
  const { keyword, suggestions, setKeyword, clearKeyword, removeSuggestion } =
    useContext(GlobalSearchContext)

  const {
    applicationIntegrations,
    isLoading: isApplicationIntegrationsLoading,
  } = useContext(ApplicationIntegrationsContext)

  const sideBarNaggingProps = useSideBarNagging(
    dataCenter?.additional.nodeLicenseStatus,
  )

  const quickAccesses = applicationIntegrations.map(
    (applicationIntegration) => {
      const key = applicationIntegration.name as ApplicationIntegrationKey
      const uiData = applicationIntegrationUIData[key]

      if (!uiData) {
        console.warn(
          `No UI data is defined for application integration: ${applicationIntegration.name}`,
        )
      }

      return {
        Icon: uiData.Icon,
        hoverMessage: uiData.displayName,
        href: applicationIntegration.url,
      }
    },
  )

  const functionBarItems = useFunctionBarItems()

  usePollNotifications()

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
            isLoading={isApplicationIntegrationsLoading}
            keyword={keyword}
            suggestions={suggestions}
            onKeywordChange={setKeyword}
            onKeywordClear={clearKeyword}
            onRemoveSuggestion={removeSuggestion}
            quickAccesses={quickAccesses}
            functionBarItems={functionBarItems}
          />
          {/**
           * Only render <Content> when `dataCenter` is available,
           * ensuring it always has access to a valid `dataCenter` value.
           */}
          {dataCenter && (
            <Content>{keyword ? <SearchPage /> : children}</Content>
          )}
        </div>
      </div>
    </div>
  )
}

export default Layout
