import { HostRankingPanel } from './HostRankingPanel'
import { VmRankingPanel } from './VmRankingPanel'

export const RankingPanel = () => {
  return (
    <div className="flex gap-x-4">
      <HostRankingPanel />
      <VmRankingPanel />
    </div>
  )
}
