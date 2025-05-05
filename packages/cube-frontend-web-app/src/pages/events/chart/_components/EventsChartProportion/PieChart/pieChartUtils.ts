import { ActiveElement, ChartData, ChartOptions } from 'chart.js'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { RankedEvent } from '../../useRankedEvents'
import {
  getChartTooltipBodyFont,
  getChartTooltipTitleFont,
} from '@cube-frontend/web-app/utils/chart'
import { hexToRGBA, getChartLabelByEventsType } from '../../utils'

export const chartColors = [
  cubeTheme.colors.chart[1],
  cubeTheme.colors.chart[2],
  cubeTheme.colors.chart[3],
  cubeTheme.colors.chart[4],
  cubeTheme.colors.chart[5],
  cubeTheme.colors.chart[6],
  cubeTheme.colors.chart[7],
  cubeTheme.colors.chart[8],
  cubeTheme.colors.chart[9],
  cubeTheme.colors.chart[10],
  cubeTheme.colors.chart[11],
  cubeTheme.colors.chart[12],
  cubeTheme.colors.chart[13],
  cubeTheme.colors.chart[14],
  cubeTheme.colors.chart[15],
  cubeTheme.colors.chart[16],
  cubeTheme.colors.chart[17],
  cubeTheme.colors.chart[18],
  cubeTheme.colors.chart[19],
  cubeTheme.colors.chart[20],
  cubeTheme.colors.chart[21],
  cubeTheme.colors.chart[22],
  cubeTheme.colors.chart[23],
  cubeTheme.colors.chart[24],
]

export type PieChartData = RankedEvent & {
  color: string
}

type ReturnChartData = ChartData<'pie', number[], string> & {
  items: PieChartData[]
}

export const getChartData = (
  eventsType: GetEventsTypeEnum,
  rankedEvents: RankedEvent[],
  targetEvent: RankedEvent | undefined,
): ReturnChartData | undefined => {
  if (rankedEvents.length === 0) return undefined

  const items = rankedEvents.map((event, index) => {
    /**
     * Determine whether the event is in a "blur" state
     * isBlur  =>  Reduce its opacity by using the `hexToRGBA` function
     * !isBlur =>  Keep the original color
     */
    const isBlur = !!targetEvent && targetEvent.uniqueId !== event.uniqueId

    const originalColor = chartColors[index % chartColors.length]

    const colorWithOpacity = isBlur
      ? hexToRGBA(originalColor, 0.3)
      : originalColor

    return {
      ...event,
      color: colorWithOpacity,
    }
  })

  return {
    labels: items.map((event) => getChartLabelByEventsType(eventsType, event)),
    datasets: [
      {
        data: items.map((item) => item.percent),
        backgroundColor: items.map((item) => item.color),
      },
    ],
    items,
  }
}

export const getChartOptions = (
  eventsType: GetEventsTypeEnum,
  chartData: ReturnChartData | undefined,
  handleMouseEnter: (event: RankedEvent) => void,
  handleMouseLeave: () => void,
  handleClick: () => void,
): ChartOptions<'pie'> => {
  if (!chartData) return {} as ChartOptions<'pie'>

  const tooltipContents = chartData.items.map((item) => ({
    percent: item.percent,
    host: item.host || '-',
    instanceId: item.instanceId || '-',
    instanceName: item.instanceName || '-',
  }))

  return {
    responsive: true,
    maintainAspectRatio: false,
    font: {
      family: cubeTheme.fontFamily.inter[0],
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        displayColors: false,
        backgroundColor: cubeTheme.colors.dark[700],
        bodyColor: cubeTheme.colors.grey[0],
        titleColor: cubeTheme.colors.primary[200],
        titleMarginBottom: 2,
        titleFont: getChartTooltipTitleFont(),
        bodyFont: getChartTooltipBodyFont(),
        boxPadding: 4,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems?.[0].label.split('(')[0]
          },
          label: (tooltipItem) => {
            const { percent, host, instanceName, instanceId } =
              tooltipContents[tooltipItem.dataIndex]

            if (eventsType === 'host')
              return [`Proportion: ${percent.toFixed(1)}%`, `Host: ${host}`]

            if (eventsType === 'instance')
              return [
                `Proportion: ${percent.toFixed(1)}%`,
                `Instance Name: ${instanceName}`,
                `Instance ID: ${instanceId}`,
              ]

            return `Proportion: ${percent.toFixed(1)}%`
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 1,
        borderColor: '#ffffff',
      },
    },
    onClick: (_, elements: ActiveElement[]) => {
      if (!chartData) {
        console.warn('No available data')
        return
      }

      if (elements.length > 0) {
        handleClick()
      } else {
        console.warn('No available data')
      }
    },
    onHover: (_, elements: ActiveElement[], chart) => {
      if (elements.length > 0) {
        /**
         * Get the index of the hovered slice
         * And access the `id` from `items` array based on the index
         */
        const index = elements[0].index
        const { color, ...newItem } = chartData.items[index]

        handleMouseEnter(newItem)
        chart.canvas.style.setProperty('cursor', 'pointer')
      } else {
        handleMouseLeave()
        chart.canvas.style.removeProperty('cursor')
      }
    },
  }
}
