import { Node } from '@cube-frontend/api'
import { CpuPerformanceChart } from './CpuPerformanceChart'
import { MemoryPerformanceChart } from './MemoryPerformanceChart'
import ScrollContainer from '@cube-frontend/web-app/components/ScrollContainer/ScrollContainer'

type NodeChartsProps = {
  node: Node | undefined
}

export const NodeCharts = (props: NodeChartsProps) => {
  const { node } = props

  return (
    <ScrollContainer className="flex gap-x-4 overflow-auto [&>*]:min-w-[400px]">
      <CpuPerformanceChart node={node} />
      <MemoryPerformanceChart node={node} />
    </ScrollContainer>
  )
}
