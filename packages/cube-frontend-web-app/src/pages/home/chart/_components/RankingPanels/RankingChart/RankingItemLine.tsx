import { useMemo } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ChartOptions,
  ChartData,
} from 'chart.js'
import { Line } from 'react-chartjs-2'
import { MetricRankRankInner } from '@cube-frontend/api'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { toUnitAbbreviation } from '@cube-frontend/web-app/utils/unit'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
)

export type RankingItemLineProps = {
  unit: string
  rankItem: MetricRankRankInner
  onMouseEnter: () => void
  onMouseLeave: () => void
}

const getChartData = (
  rankItem: MetricRankRankInner,
): ChartData<'line', number[], string> => {
  return {
    labels: rankItem.history.map((item) => formatChartXAxisTime(item.time)),
    datasets: [
      {
        data: rankItem.history.map((item) => item.value),
        fill: false,
        borderColor: cubeTheme.colors.chart[3],
        tension: 0.1,
      },
    ],
  }
}

const getChartOptions = (unit: string): ChartOptions<'line'> => {
  return {
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    font: {
      family: cubeTheme.fontFamily.inter[0],
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
        suggestedMin: 0,
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverBorderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        yAlign: 'center',
        displayColors: false,
        padding: 4,
        titleMarginBottom: 0,
        titleColor: cubeTheme.colors.primary[200],
        callbacks: {
          label: (context) => {
            const value = toAbbreviation(context.parsed.y)
            const abbreviationUnit = toUnitAbbreviation(unit)
            return `${value} ${abbreviationUnit}`
          },
        },
      },
    },
  }
}

export const RankingItemLine = (props: RankingItemLineProps) => {
  const { unit, rankItem, onMouseEnter, onMouseLeave } = props

  const chartData = useMemo(() => getChartData(rankItem), [rankItem])
  const options = useMemo(() => getChartOptions(unit), [unit])

  return (
    <Line
      height={36}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      data={chartData}
      options={options}
    />
  )
}
