import { MetricRankRankInner } from '@cube-frontend/api'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'
import { toAbbreviation } from '@cube-frontend/web-app/utils/number'
import {
  CategoryScale,
  ChartData,
  Chart as ChartJS,
  ChartOptions,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
)

export type RankingItemLineProps = {
  unitDisplay: string
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

const getChartOptions = (unitDisplay: string): ChartOptions<'line'> => {
  return {
    responsive: true,
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
            return `${value} ${unitDisplay}`
          },
        },
      },
    },
  }
}

export const RankingItemLine = (props: RankingItemLineProps) => {
  const { unitDisplay, rankItem, onMouseEnter, onMouseLeave } = props

  const chartData = useMemo(() => getChartData(rankItem), [rankItem])
  const options = useMemo(() => getChartOptions(unitDisplay), [unitDisplay])

  return (
    <div className="relative w-full">
      <Line
        height={36}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data={chartData}
        options={options}
      />
    </div>
  )
}
