import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { useContext } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { grafanaApi } from '@cube-frontend/web-app/api/cosApi'
import { GrafanaApiGetGrafanaStoragesRequest } from '@cube-frontend/api'
import { computeTitleBarHyperlinkProps } from '../utils'

export const StoragePanels = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: grafanaLinkResponse } = useCosGetRequest(
    grafanaApi.getGrafanaStorages,
    (): GrafanaApiGetGrafanaStoragesRequest => ({
      dataCenter: dataCenter!.name,
    }),
  )

  return (
    <CosGeneralPanel.Container>
      <CosGeneralPanel.TitleBar
        title="Storage"
        hyperLinkProps={computeTitleBarHyperlinkProps(grafanaLinkResponse)}
      />
      <div className="flex items-stretch gap-x-4 [&>*]:flex-1">
        <StorageBandwidthPanel />
        <StorageIopsPanel />
        <StorageLatencyPanel />
      </div>
    </CosGeneralPanel.Container>
  )
}
