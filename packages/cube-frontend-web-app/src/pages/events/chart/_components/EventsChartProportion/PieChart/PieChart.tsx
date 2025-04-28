import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'
import { PieChartLabel } from './PieChartLabel'
import { PieChartSkeleton } from './PieChartSkeleton'
import { getChartData, getChartOptions } from './pieChartUtils'
import { ChartType, getRedirectUrl } from '../../utils'
import { ChartQuery } from '../../useEventsChartQuery'
import { ChartEmpty } from '../../ChartEmpty'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  isRankedEventsLoading: boolean
  rankedEvents: GetRankedEventsResponseDataEventsInner[] | undefined
  chartType: ChartType
  chartQuery: ChartQuery
}

export const PieChart = (props: PieChartProps) => {
  const { rankedEvents, isRankedEventsLoading, chartType, chartQuery } = props

  const [targetEventId, setTargetEventId] = useState<string>()

  const navigate = useNavigate()

  const redirectUrl = getRedirectUrl(chartType, chartQuery, targetEventId ?? '')

  const handleMouseEnter = (key: string) => {
    setTargetEventId(key)
  }

  const handleMouseLeave = () => {
    setTargetEventId(undefined)
  }

  /**
   * Convert object entries into a query string format
   * Navigate to `/events` page with the current filters
   */
  const handleClick = useCallback(() => {
    if (!targetEventId) return
    navigate(redirectUrl)
  }, [navigate, redirectUrl, targetEventId])

  const chartData = useMemo(
    () => getChartData(rankedEvents, targetEventId),
    [rankedEvents, targetEventId],
  )

  const chartOptions = useMemo(
    () => getChartOptions(chartData, setTargetEventId, handleClick),
    [chartData, handleClick],
  )

  if (isRankedEventsLoading) return <PieChartSkeleton />

  if (!chartData) return <ChartEmpty />

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
              isBlur={!!targetEventId && targetEventId !== id}
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
              redirectUrl={redirectUrl}
            />
          )
        })}
      </div>
    </div>
  )
}
