import { NodePanel } from '../../components/NodePanel/NodePanel'
import { EventPanel } from '../../components/EventPanel/EventPanel'
import MetricsPanel from '../../components/MetricsPanel/MetricsPanel'
import HealthPanel from '../../components/HealthPanel/HealthPanel'

const OverviewTab = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <MetricsPanel />
      <HealthPanel />
      <EventPanel />
      <NodePanel />
    </div>
  )
}

export default OverviewTab
