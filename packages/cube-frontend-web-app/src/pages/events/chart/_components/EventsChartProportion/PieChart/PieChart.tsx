import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'
import { ChartType } from '../../utils'
import { PieChartLabel } from './PieChartLabel'
import { PieChartSkeleton } from './PieChartSkeleton'
import { getChartData, getChartOptions } from './pieChartUtils'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  chartType: ChartType
  getRedirectQuery: (chartType: ChartType, eventId: string) => string
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  isRankedEventsLoading: boolean
}

export const PieChart = (props: PieChartProps) => {
  const { chartType, getRedirectQuery, rankedEvents, isRankedEventsLoading } =
    props

  const navigate = useNavigate()

  const [targetEventKey, setTargetEventKey] = useState<string>()

  const handleMouseEnter = (key: string) => {
    setTargetEventKey(key)
  }

  const handleMouseLeave = () => {
    setTargetEventKey(undefined)
  }

  /**
   * Convert object entries into a query string format
   * Navigate to `/events` page with the current filters
   */
  const handleClick = useCallback(() => {
    if (!targetEventKey) return

    const redirectQuery = getRedirectQuery(chartType, targetEventKey)
    navigate(redirectQuery)
  }, [chartType, getRedirectQuery, navigate, targetEventKey])

  const chartData = useMemo(
    () => getChartData(rankedEvents, targetEventKey),
    [rankedEvents, targetEventKey],
  )

  const chartOptions = useMemo(
    () => getChartOptions(chartData, setTargetEventKey, handleClick),
    [chartData, handleClick],
  )

  if (isRankedEventsLoading) return <PieChartSkeleton />

  if (!chartData) return <p>No data available</p>

  return (
    <div className="flex items-center justify-center gap-11 px-5 py-3">
      <div className="size-[220px] shrink-0">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-cols-4 gap-x-9">
        {chartData?.items?.map((item) => {
          const { id, color, percentage } = item
          return (
            <PieChartLabel
              key={id}
              eventId={id}
              color={color}
              percentage={percentage}
              isBlur={!!targetEventKey && targetEventKey !== id}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
              onClick={handleClick}
            />
          )
        })}
      </div>
    </div>
  )
}
