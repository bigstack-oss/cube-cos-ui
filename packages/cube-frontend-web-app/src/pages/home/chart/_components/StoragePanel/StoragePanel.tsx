import { StorageBandwidthPanel } from './StorageBandwidthPanel'
import { StorageIopsPanel } from './StorageIopsPanel'
import { StorageLatencyPanel } from './StorageLatencyPanel'

export const StoragePanel = () => {
  return (
    <div className="flex gap-x-4">
      <StorageBandwidthPanel />
      <StorageIopsPanel />
      <StorageLatencyPanel />
    </div>
  )
}
