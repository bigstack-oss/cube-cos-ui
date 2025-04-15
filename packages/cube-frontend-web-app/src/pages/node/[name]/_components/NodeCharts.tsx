import { Node } from '@cube-frontend/api'
import { CpuPerformanceChart } from './CpuPerformanceChart'
import { MemoryPerformanceChart } from './MemoryPerformanceChart'

type NodeChartsProps = {
  node: Node | undefined
}

export const NodeCharts = (props: NodeChartsProps) => {
  const { node } = props

  return (
    <div className="flex gap-x-4">
      <CpuPerformanceChart node={node} />
      <MemoryPerformanceChart node={node} />
    </div>
  )
}
