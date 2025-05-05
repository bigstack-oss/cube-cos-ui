import { useCallback, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'react-chartjs-2'
import { twMerge } from 'tailwind-merge'
import { RankedEvent } from '../../useRankedEvents'
import { ChartQuery } from '../../useEventsChartQuery'
import { ChartEmpty } from '../../ChartEmpty'
import { getRedirectUrl } from '../../utils'
import { getChartData, getChartOptions } from './pieChartUtils'
import { PieChartLabel } from './PieChartLabel'
import { PieChartSkeleton } from './PieChartSkeleton'

ChartJS.register(ArcElement, Tooltip, Legend)

type PieChartProps = {
  isRankedEventsLoading: boolean
  rankedEvents: RankedEvent[]
  chartQuery: ChartQuery
}

export const PieChart = (props: PieChartProps) => {
  const { isRankedEventsLoading, rankedEvents, chartQuery } = props

  const [targetEvent, setTargetEvent] = useState<RankedEvent | undefined>(
    undefined,
  )

  const navigate = useNavigate()

  const handleMouseEnter = useCallback(
    (event: RankedEvent) => {
      if (event.uniqueId !== targetEvent?.uniqueId) setTargetEvent(event)
    },
    [targetEvent?.uniqueId],
  )

  const handleMouseLeave = useCallback(() => {
    setTargetEvent(undefined)
  }, [])

  /**
   * Convert object entries into a query string format
   * Navigate to `/events` page with the current filters
   */
  const handleClick = useCallback(() => {
    const redirectUrl = getRedirectUrl(chartQuery, targetEvent)
    navigate(redirectUrl)
  }, [chartQuery, navigate, targetEvent])

  const chartData = useMemo(
    () => getChartData(chartQuery.type, rankedEvents, targetEvent),
    [chartQuery.type, rankedEvents, targetEvent],
  )

  const chartOptions = useMemo(
    () =>
      getChartOptions(
        chartQuery.type,
        chartData,
        handleMouseEnter,
        handleMouseLeave,
        handleClick,
      ),
    [
      chartData,
      chartQuery.type,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
    ],
  )

  if (isRankedEventsLoading) return <PieChartSkeleton />

  if (!chartData) return <ChartEmpty />

  return (
    <div
      className={twMerge(
        'flex flex-wrap items-center justify-center gap-y-3 px-5 py-3',
        chartData?.items?.length > 12 ? 'flex-col' : 'flex-row',
      )}
    >
      {/**
       * The width is set to `380px` to ensure Canvas has enough space for tooltip rendering,
       * especially to prevent content (e.g., long instance IDs) from being clipped.
       * It is a workaround until a more flexible layout is implemented.
       */}
      <div className="h-[220px] w-[380px] shrink-0">
        <Pie data={chartData} options={chartOptions} />
      </div>
      <div className="grid grid-flow-col grid-rows-6 gap-x-9">
        {chartData?.items?.map((item) => {
          const redirectUrl = getRedirectUrl(chartQuery, item)

          return (
            <PieChartLabel
              key={item.uniqueId}
              event={item}
              eventsType={chartQuery.type}
              isBlur={!!targetEvent && targetEvent.uniqueId !== item.uniqueId}
              onMouseEnter={() => handleMouseEnter(item)}
              onMouseLeave={handleMouseLeave}
              redirectUrl={redirectUrl}
            />
          )
        })}
      </div>
    </div>
  )
}
