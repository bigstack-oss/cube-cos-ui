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
import { ChartType, getRedirectUrl } from '../../utils'
import { BarChartSkeleton } from './BarChartSkeleton'
import { drawValuePlugin, getChartData, getChartOptions } from './barChartUtils'
import { ChartQuery } from '../../useEventsChartQuery'
import { ChartEmpty } from '../../ChartEmpty'

ChartJS.register(BarElement, ArcElement, Tooltip, Legend)

type BarChartProps = {
  isRankedEventsLoading: boolean
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  chartType: ChartType
  chartQuery: ChartQuery
}

export const BarChart = (props: BarChartProps) => {
  const { rankedEvents, isRankedEventsLoading, chartType, chartQuery } = props

  const navigate = useNavigate()

  const handleClick = useCallback(
    (selectedEventId: string) => {
      const redirectQuery = getRedirectUrl(
        chartType,
        chartQuery,
        selectedEventId,
      )
      navigate(redirectQuery)
    },
    [chartQuery, chartType, navigate],
  )

  const chartData = useMemo(() => getChartData(rankedEvents), [rankedEvents])

  const chartOptions = useMemo(
    () => getChartOptions(chartData, handleClick),
    [chartData, handleClick],
  )

  if (isRankedEventsLoading) return <BarChartSkeleton />

  if (!chartData) return <ChartEmpty />

  return (
    <Bar data={chartData} options={chartOptions} plugins={[drawValuePlugin]} />
  )
}
