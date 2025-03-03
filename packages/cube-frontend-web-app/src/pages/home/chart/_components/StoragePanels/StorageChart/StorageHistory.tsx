import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import {
  TimeValue,
  Formatter,
  getLineChartData as getChartData,
  getChartOptions,
} from './utils'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
)

export type StorageHistoryProps = {
  read: TimeValue[]
  write: TimeValue[]
  unit: string
  unitSuffix?: string
  formatter: Formatter
  isLoading: boolean
}

export const StorageHistory = (props: StorageHistoryProps) => {
  const { read, write, unit, unitSuffix = '', formatter, isLoading } = props

  const chartData = useMemo(() => getChartData({ read, write }), [read, write])
  const options = useMemo(
    () => getChartOptions({ unit, unitSuffix, isLoading, formatter }),
    [unit, unitSuffix, isLoading, formatter],
  )

  return (
    <div className="h-[400px]">
      <Line data={chartData} options={options} />
    </div>
  )
}
