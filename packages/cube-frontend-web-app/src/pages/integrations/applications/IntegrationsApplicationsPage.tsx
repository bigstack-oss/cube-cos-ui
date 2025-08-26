import { useContext, useMemo } from 'react'
import { upperFirst, uniqueId } from 'lodash'
import { GetIntegrationsResponseDataInner } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  GetCosBasicTable,
  type CosTableRow,
} from '@cube-frontend/ui-library'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import {
  ApplicationIntegrationKey,
  applicationIntegrationUIData,
} from '@cube-frontend/web-app/utils/applicationIntegration'

type ApplicationRow = CosTableRow & GetIntegrationsResponseDataInner

const ApplicationTable = GetCosBasicTable<ApplicationRow>()

const applicationToRow = (item: GetIntegrationsResponseDataInner) => ({
  id: uniqueId('integration'),
  ...item,
})

const renderApplicationName = (name: string) => {
  const key = name as ApplicationIntegrationKey
  const uiData = applicationIntegrationUIData[key]

  if (!uiData) {
    console.warn(`No UI data is defined for application: ${name}`)
    return upperFirst(name)
  }

  return uiData.displayName
}

export const IntegrationsApplicationsPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.getIntegratedApplications,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const rows = useMemo(() => data?.map(applicationToRow) || [], [data])

  return (
    <CosGeneralPanel topic="Applications">
      <ApplicationTable rows={rows} isLoading={isLoading}>
        <ApplicationTable.Column property="url" fitContent={true}>
          {(url) => (
            <a target="_blank" href={url}>
              <CosButton type="light" size="sm">
                Connect
              </CosButton>
            </a>
          )}
        </ApplicationTable.Column>
        <ApplicationTable.Column
          label="Application"
          property="name"
          emphasize={true}
        >
          {renderApplicationName}
        </ApplicationTable.Column>
        <ApplicationTable.Column
          label="Shown on header"
          property="isHeaderShortcutEnabled"
        >
          {(isHeaderShortcutEnabled) => (
            <span className="primary-body3 text-functional-text-light">
              {/*
               * TODO: In Phase 1, all applications are `Required`.
               * Should discuss the `Non-Required` wording with the team in Phase 2.
               */}
              {isHeaderShortcutEnabled ? 'Required' : 'Non-Required'}
            </span>
          )}
        </ApplicationTable.Column>
        <ApplicationTable.Column label="Description" property="description" />
        <ApplicationTable.Column property="isBuiltIn">
          {(isBuiltIn) => (
            <span className="primary-body3 text-nowrap text-functional-text-light">
              {/*
               * TODO: In Phase 1, all integrations are `Built-in`.
               * Should discuss the `Non-Built-in` wording with the team in Phase 2.
               */}
              {isBuiltIn ? 'Built in' : 'Non Built in'}
            </span>
          )}
        </ApplicationTable.Column>
      </ApplicationTable>
    </CosGeneralPanel>
  )
}
