import { HostRankingPanel } from './HostRankingPanel'
import { VmRankingPanel } from './VmRankingPanel'

export const RankingPanels = () => {
  return (
    <div className="flex items-stretch gap-x-4 [&>*]:flex-1">
      <HostRankingPanel />
      <VmRankingPanel />
    </div>
  )
}
