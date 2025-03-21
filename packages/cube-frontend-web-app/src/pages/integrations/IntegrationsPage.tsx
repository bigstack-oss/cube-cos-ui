import { useContext, useMemo } from 'react'
import { uniqueId } from 'lodash'
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

type IntegrationRow = CosTableRow & GetIntegrationsResponseDataInner

const IntegrationTable = GetCosBasicTable<IntegrationRow>()

const integrationToRow = (item: GetIntegrationsResponseDataInner) => ({
  id: uniqueId('integration'),
  ...item,
})

export const IntegrationsPage = () => {
  const { name: dataCenter } = useContext(DataCenterContext)

  const { data, isLoading } = useCosGetRequest(
    integrationsApi.getIntegrations,
    () => ({ dataCenter }),
  )

  const rows = useMemo(() => data?.map(integrationToRow) || [], [data])

  const handleConnectButtonClick = (url: string) => () => {
    window.open(url, '_blank')
  }

  return (
    <CosGeneralPanel topic="Integrations">
      <div className="flex flex-col gap-y-2 pt-2">
        <h5 className="primary-h5 text-functional-text">Integrations</h5>
        <IntegrationTable rows={rows} isLoading={isLoading}>
          <IntegrationTable.Column property="url" fitContent={true}>
            {(url) => (
              <CosButton
                type="light"
                size="sm"
                onClick={handleConnectButtonClick(url)}
              >
                Connect
              </CosButton>
            )}
          </IntegrationTable.Column>
          <IntegrationTable.Column
            label="Integration"
            property="name"
            emphasize={true}
          />
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
