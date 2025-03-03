import { noop } from 'lodash'
import { CosGeneralPanelTitleBar } from '@cube-frontend/ui-library'
import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'

export const StoragePanels = () => {
  return (
    <div>
      <CosGeneralPanelTitleBar
        title="Storage"
        hyperLinkProps={{
          children: 'More storage on Grafana',
          // TODO: We need the backend API to provide the link.
          onClick: noop,
        }}
      />
      <div className="flex gap-x-4">
        <StorageBandwidthPanel />
        <StorageIopsPanel />
        <StorageLatencyPanel />
      </div>
    </div>
  )
}
