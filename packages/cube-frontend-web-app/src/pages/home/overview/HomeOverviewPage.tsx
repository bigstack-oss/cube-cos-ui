import ChartPanel from './_components/ChartPanel/ChartPanel'
import HealthPanel from './_components/HealthPanel/HealthPanel'
import { EventPanel } from './_components/EventPanel'
import { NodePanel } from './_components/NodePanel'

export const HomeOverviewPage = () => {
  return (
    <div className="mt-5 flex flex-col gap-y-5">
      <ChartPanel />
      <HealthPanel />
      <EventPanel />
      <NodePanel />
    </div>
  )
}
