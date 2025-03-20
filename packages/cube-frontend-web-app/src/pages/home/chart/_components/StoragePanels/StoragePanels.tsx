import { noop } from 'lodash'
import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'
import { CosGeneralPanel } from '@cube-frontend/ui-library'

export const StoragePanels = () => {
  return (
    <CosGeneralPanel.Container>
      <CosGeneralPanel.TitleBar
        title="Storage"
        hyperLinkProps={{
          children: 'More storage on Grafana',
          // TODO: We need the backend API to provide the link.
          onClick: noop,
        }}
      />
      <div className="flex items-stretch gap-x-4 [&>*]:flex-1">
        <StorageBandwidthPanel />
        <StorageIopsPanel />
        <StorageLatencyPanel />
      </div>
    </CosGeneralPanel.Container>
  )
}
