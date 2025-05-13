import {
  CosPercentagePieChart,
  CosPercentagePieChartProps,
} from '@cube-frontend/ui-library'

const formatCpuPercentage = (value: number) => {
  return `${value / 100}x`
}

export type CpuPercentagePieChartProps = Omit<
  CosPercentagePieChartProps,
  | 'title'
  | 'color'
  | 'percentageFormatter'
  | 'overLimitText'
  | 'thresholdPercentage'
>

export const CpuPercentagePieChart = (props: CpuPercentagePieChartProps) => {
  return (
    <CosPercentagePieChart
      title="vCPU"
      color="stroke-chart-2"
      percentageFormatter={formatCpuPercentage}
      thresholdPercentage={400}
      {...props}
    />
  )
}
