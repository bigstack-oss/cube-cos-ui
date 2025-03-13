import { CosSkeleton, CosProgressBarChart } from '@cube-frontend/ui-library'

type UsageMetricsItemProps = {
  name: string
  nodeCount?: number
  cpuUsedPercent: number
  memoryUsedPercent: number
  isLoading: boolean
}

export const UsageMetricsItem = (props: UsageMetricsItemProps) => {
  const { name, nodeCount, cpuUsedPercent, memoryUsedPercent, isLoading } =
    props

  const renderNodeCount = () => {
    if (nodeCount === undefined) return null
    if (isLoading) return <CosSkeleton className="h-[18px] w-[48px]" />

    return (
      <span className="primary-body3 text-functional-text">{nodeCount}</span>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-y-3">
      <div className="flex items-center gap-x-3">
        <span className="primary-body2 font-medium text-functional-title">
          {name}
        </span>
        {renderNodeCount()}
      </div>
      <div className="flex gap-x-6">
        <CosProgressBarChart
          isLoading={isLoading}
          progress={Math.floor(cpuUsedPercent)}
          color="bg-chart-1"
          title="CPU"
        />
        <CosProgressBarChart
          isLoading={isLoading}
          progress={Math.floor(memoryUsedPercent)}
          color="bg-chart-1"
          title="Memory"
        />
      </div>
    </div>
  )
}
