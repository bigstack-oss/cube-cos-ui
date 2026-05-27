import { TooltipCallbacks, TooltipItem } from 'chart.js'
import { CosColumnChart } from '../../../../components/CosChart'
import { mockData } from './mockData'

type ColumnChartProps = {
  isLoading?: boolean
  hasData?: boolean
}

export const ColumnChart = (props: ColumnChartProps) => {
  const { isLoading = false, hasData = true } = props

  const tooltipCallbackFn = () => {
    return {
      title: (tooltipItems: TooltipItem<'bar'>[]) => {
        return tooltipItems?.[0].label.split('(')[0]
      },
      label: (tooltipItem: TooltipItem<'bar'>) => {
        return [
          `Custom Tooltip Label: ${tooltipItem.label}`,
          `Custom Tooltip Counting: ${tooltipItem.formattedValue}`,
        ]
      },
    } as TooltipCallbacks<'bar'>
  }

  const data = hasData ? mockData : []

  return (
    <CosColumnChart
      isLoading={isLoading}
      yAxisTitle="Number of occurrences"
      data={data}
      tooltipCallbackFn={tooltipCallbackFn}
      onBarClick={() => {}}
      onBarHover={() => {}}
      onEmptyHover={() => {}}
    />
  )
}
