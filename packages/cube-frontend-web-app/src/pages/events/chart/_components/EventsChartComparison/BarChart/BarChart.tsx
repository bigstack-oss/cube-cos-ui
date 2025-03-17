import { useCallback, useMemo } from 'react'
import { useNavigate } from 'react-router'
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'
import { ChartType } from '../../utils'
import { BarChartSkeleton } from './BarChartSkeleton'
import { drawValuePlugin, getChartData, getChartOptions } from './barChartUtils'

ChartJS.register(BarElement, ArcElement, Tooltip, Legend)

type BarChartProps = {
  chartType: ChartType
  getRedirectQuery: (chartType: ChartType, eventId: string) => string
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  isRankedEventsLoading: boolean
}

export const BarChart = (props: BarChartProps) => {
  const { chartType, getRedirectQuery, rankedEvents, isRankedEventsLoading } =
    props

  const navigate = useNavigate()

  const handleClick = useCallback(
    (key: string) => {
      const redirectQuery = getRedirectQuery(chartType, key)
      navigate(redirectQuery)
    },
    [chartType, getRedirectQuery, navigate],
  )

  const chartData = useMemo(() => getChartData(rankedEvents), [rankedEvents])

  const chartOptions = useMemo(
    () => getChartOptions(chartData, handleClick),
    [chartData, handleClick],
  )

  if (isRankedEventsLoading) return <BarChartSkeleton />

  if (!chartData) return <p>No data available</p>

  return (
    <Bar data={chartData} options={chartOptions} plugins={[drawValuePlugin]} />
  )
}
