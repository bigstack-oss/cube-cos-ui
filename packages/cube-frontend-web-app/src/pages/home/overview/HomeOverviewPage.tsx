import MetricsPanel from '@cube-frontend/web-app/pages/home/overview/_components/MetricsPanel/MetricsPanel'
import HealthPanel from '@cube-frontend/web-app/pages/home/overview/_components/HealthPanel/HealthPanel'
import { EventPanel } from './_components/EventPanel'
import { NodePanel } from './_components/NodePanel'

export const HomeOverviewPage = () => {
  return (
    <div className="mt-5 flex flex-col gap-y-5">
      <MetricsPanel />
      <HealthPanel />
      <EventPanel />
      <NodePanel />
    </div>
  )
}
