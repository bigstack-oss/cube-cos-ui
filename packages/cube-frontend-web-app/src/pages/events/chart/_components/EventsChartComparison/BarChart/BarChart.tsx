import { useCallback, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router'
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { getRedirectUrl, hexToRGBA } from '../../utils'
import { ChartQuery } from '../../useEventsChartQuery'
import { ChartEmpty } from '../../ChartEmpty'
import { RankedEvent } from '../../useRankedEvents'
import { BarChartSkeleton } from './BarChartSkeleton'
import { getChartData, getChartOptions } from './barChartUtils'

ChartJS.register(BarElement, ArcElement, Tooltip, Legend)

type BarChartProps = {
  isRankedEventsLoading: boolean
  rankedEvents: RankedEvent[]
  chartQuery: ChartQuery
}

export const BarChart = (props: BarChartProps) => {
  const { rankedEvents, isRankedEventsLoading, chartQuery } = props

  const hoveredEventIndexRef = useRef<number | null>(null)

  const [targetEvent, setTargetEvent] = useState<RankedEvent | undefined>(
    undefined,
  )

  const navigate = useNavigate()

  const handleClick = useCallback(
    (event: RankedEvent) => {
      const redirectUrl = getRedirectUrl(chartQuery, event)
      navigate(redirectUrl)
    },
    [chartQuery, navigate],
  )

  const chartData = useMemo(
    () => getChartData(chartQuery.type, rankedEvents, targetEvent),
    [chartQuery.type, rankedEvents, targetEvent],
  )

  const handleMouseEnter = useCallback(
    (event: RankedEvent) => {
      if (event.uniqueId !== targetEvent?.uniqueId && chartData) {
        const index = chartData.items.findIndex(
          (item) => item.uniqueId === event.uniqueId,
        )

        if (index !== -1) {
          hoveredEventIndexRef.current = index
        }

        setTargetEvent(event)
      }
    },
    [chartData, targetEvent?.uniqueId],
  )

  const handleMouseLeave = useCallback(() => {
    hoveredEventIndexRef.current = null
    setTargetEvent(undefined)
  }, [])

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

  if (isRankedEventsLoading) return <BarChartSkeleton />

  if (!chartData) return <ChartEmpty />

  return (
    <div className="relative h-[385px]">
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[
          {
            id: 'drawValuePlugin',
            afterDatasetsDraw: (chart) => {
              const ctx = chart.ctx
              const fontFamily = cubeTheme.fontFamily.inter[0]
              const fontSize = cubeTheme.fontSize['primary-body5'][0]

              ctx.font = `${fontSize} ${fontFamily}`
              ctx.textAlign = 'center'

              chart.data.datasets.forEach((dataset, i) => {
                const meta = chart.getDatasetMeta(i)

                meta.data.forEach((bar, index) => {
                  const value = dataset.data[index] as number
                  const labelColor = cubeTheme.colors.functional.text

                  ctx.fillStyle =
                    hoveredEventIndexRef.current === null ||
                    hoveredEventIndexRef.current === index
                      ? labelColor
                      : hexToRGBA(labelColor, 0.3)
                  ctx.fillText(value.toString(), bar.x, bar.y - 8)
                })
              })
            },
          },
        ]}
        className="min-w-0"
      />
    </div>
  )
}
