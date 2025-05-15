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
  IntegrationKey,
  integrationUIData,
} from '@cube-frontend/web-app/utils/integration'

type IntegrationRow = CosTableRow & GetIntegrationsResponseDataInner

const IntegrationTable = GetCosBasicTable<IntegrationRow>()

const integrationToRow = (item: GetIntegrationsResponseDataInner) => ({
  id: uniqueId('integration'),
  ...item,
})

const renderIntegrationName = (name: string) => {
  const key = name as IntegrationKey
  const uiData = integrationUIData[key]

  if (!uiData) {
    console.warn(`No UI data is defined for integration: ${name}`)
    return upperFirst(name)
  }

  return uiData.displayName
}

export const IntegrationsPage = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.getIntegrations,
    () => ({
      dataCenter: dataCenter!.name,
    }),
  )

  const rows = useMemo(() => data?.map(integrationToRow) || [], [data])

  return (
    <CosGeneralPanel topic="Integrations">
      <div className="pt-2">
        <IntegrationTable rows={rows} isLoading={isLoading}>
          <IntegrationTable.Column property="url" fitContent={true}>
            {(url) => (
              <a target="_blank" href={url}>
                <CosButton type="light" size="sm">
                  Connect
                </CosButton>
              </a>
            )}
          </IntegrationTable.Column>
          <IntegrationTable.Column
            label="Integration"
            property="name"
            emphasize={true}
          >
            {renderIntegrationName}
          </IntegrationTable.Column>
          <IntegrationTable.Column
            label="Shown on header"
            property="isHeaderShortcutEnabled"
          >
            {(isHeaderShortcutEnabled) => (
              <span className="primary-body3 text-functional-text-light">
                {/*
                 * TODO: In Phase 1, all integrations are `Required`.
                 * Should discuss the `Non-Required` wording with the team in Phase 2.
                 */}
                {isHeaderShortcutEnabled ? 'Required' : 'Non-Required'}
              </span>
            )}
          </IntegrationTable.Column>
          <IntegrationTable.Column label="Description" property="description" />
          <IntegrationTable.Column property="isBuiltIn">
            {(isBuiltIn) => (
              <span className="primary-body3 text-nowrap text-functional-text-light">
                {/*
                 * TODO: In Phase 1, all integrations are `Built-in`.
                 * Should discuss the `Non-Built-in` wording with the team in Phase 2.
                 */}
                {isBuiltIn ? 'Built in' : 'Non Built in'}
              </span>
            )}
          </IntegrationTable.Column>
        </IntegrationTable>
      </div>
    </CosGeneralPanel>
  )
}
