import { PropsWithChildren, useContext } from 'react'
import { Link } from 'react-router'
import { CosDropdown, CosHeader, CosSideBar } from '@cube-frontend/ui-library'
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
import { useTranslation } from 'react-i18next'
import { languageMenu, supportedLanguages } from '../i18n/i18n'

const Layout = (props: PropsWithChildren) => {
  const { children } = props

  const sideBarOptions = useSidebarOptions()

  const sideBarBottomLinks = useSidebarBottomLinks()

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { userInfo, isLoading: isUserInfoLoading } = useContext(UserContext)

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

  const { t, i18n } = useTranslation()

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
            quickAccesses={quickAccesses}
            functionBarItems={functionBarItems}
            languageDropdown={
              <CosDropdown type="radio" selectedItems={[i18n.language]}>
                <CosDropdown.Trigger placeholder="Select an Item">
                  {languageMenu.find((i) => i.value === i18n.language)?.label}
                </CosDropdown.Trigger>
                <CosDropdown.Menu>
                  {languageMenu.map(({ label, value }) => (
                    <CosDropdown.Item
                      key={value}
                      item={value}
                      onClick={() => i18n.changeLanguage(value)}
                    >
                      {label}
                    </CosDropdown.Item>
                  ))}
                </CosDropdown.Menu>
              </CosDropdown>
            }
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
