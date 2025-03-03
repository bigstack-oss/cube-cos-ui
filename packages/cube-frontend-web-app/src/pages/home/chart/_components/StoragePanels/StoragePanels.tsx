import { CosGeneralPanelTitleBar } from '@cube-frontend/ui-library'
import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'

export const StoragePanels = () => {
  return (
    <div>
      <CosGeneralPanelTitleBar title="Storage" />
      <div className="flex gap-x-4">
        <StorageBandwidthPanel />
        <StorageIopsPanel />
        <StorageLatencyPanel />
      </div>
    </div>
  )
}
