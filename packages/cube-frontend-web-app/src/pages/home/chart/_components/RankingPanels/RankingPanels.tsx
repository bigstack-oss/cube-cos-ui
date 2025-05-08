import ScrollContainer from '@cube-frontend/web-app/components/ScrollContainer/ScrollContainer'
import { twMerge } from 'tailwind-merge'
import { HostRankingPanel } from './HostRankingPanel'
import { VmRankingPanel } from './VmRankingPanel'

export const RankingPanels = () => {
  return (
    <ScrollContainer
      className={twMerge(
        'flex items-stretch gap-x-4 [&>*]:min-w-[400px] [&>*]:flex-1',
      )}
    >
      <HostRankingPanel />
      <VmRankingPanel />
    </ScrollContainer>
  )
}
