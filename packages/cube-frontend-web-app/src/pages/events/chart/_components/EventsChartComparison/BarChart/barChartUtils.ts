import { ActiveElement, ChartData, ChartOptions } from 'chart.js'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { RankedEvent } from '../../useRankedEvents'
import { hexToRGBA, getChartLabelByEventsType } from '../../utils'
import {
  getChartTooltipBodyFont,
  getChartTooltipTitleFont,
  getChartYAxisTitleFont,
} from '@cube-frontend/web-app/utils/chart'
import { TFunction } from 'i18next'

export type BarChartData = RankedEvent & {
  barColor: string
  labelColor: string
}

type ReturnChartData = ChartData<'bar', number[], string> & {
  items: BarChartData[]
}

export const getChartData = (
  eventsType: GetEventsTypeEnum,
  rankedEvents: RankedEvent[],
  targetEvent: RankedEvent | undefined,
): ReturnChartData | undefined => {
  if (rankedEvents.length === 0) return undefined

  const items = rankedEvents.map((event) => {
    const isBlur = !!targetEvent && targetEvent.uniqueId !== event.uniqueId

    const originalBarColor = cubeTheme.colors.chart[2]
    const originalLabelColor = cubeTheme.colors.functional.text

    const barColorWithOpacity = isBlur
      ? hexToRGBA(originalBarColor, 0.3)
      : originalBarColor

    const labelColorWithOpacity = isBlur
      ? hexToRGBA(originalLabelColor, 0.3)
      : originalLabelColor

    return {
      ...event,
      barColor: barColorWithOpacity,
      labelColor: labelColorWithOpacity,
    }
  })

  return {
    labels: items.map((event) => getChartLabelByEventsType(eventsType, event)),
    datasets: [
      {
        data: items.map((event) => event.number || 0),
        backgroundColor: items.map((item) => item.barColor),
        hoverBackgroundColor: cubeTheme.colors.chart[2],
        barThickness: 9,
        borderRadius: 2,
      },
    ],
    items,
  }
}

/**
 * Plugin to draw the value of each bar on top of it
 */
// export const drawValuePlugin: Plugin<'bar'> =

export const getChartOptions = (
  eventsType: GetEventsTypeEnum,
  chartData: ReturnChartData | undefined,
  handleMouseEnter: (event: RankedEvent) => void,
  handleMouseLeave: () => void,
  handleClick: (event: RankedEvent) => void,
  t: TFunction,
): ChartOptions<'bar'> => {
  if (!chartData) return {} as ChartOptions<'bar'>

  const tooltipContents = chartData.items.map((item) => ({
    number: item.number,
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
    layout: {
      padding: {
        top: 20,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: chartData.items.map((item) => item.labelColor),
        },
      },
      y: {
        title: {
          display: true,
          text: t('events.chart.numberOfOccurrences'),
          font: getChartYAxisTitleFont(),
          color: cubeTheme.colors.functional['text-light'],
        },
        ticks: {
          color: cubeTheme.colors.functional['text-light'],
        },
      },
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
            const { number, host, instanceName, instanceId } =
              tooltipContents[tooltipItem.dataIndex]

            if (eventsType === 'host')
              return [
                `${t('events.chart.counting')}: ${number}`,
                `${t('events.chart.host')}: ${host}`,
              ]

            if (eventsType === 'instance')
              return [
                `${t('events.chart.counting')}: ${number}`,
                `${t('events.chart.instanceName')}: ${instanceName}`,
                `${t('events.chart.instanceId')}: ${instanceId}`,
              ]

            return `${t('events.chart.counting')}: ${number}`
          },
        },
      },
    },
    onClick: (_, elements: ActiveElement[]) => {
      if (!chartData) {
        console.warn('No available data')
        return
      }

      if (elements.length > 0) {
        /**
         * Get the index of the selected slice
         * And access the `id` from `items` array based on the index
         */
        const index = elements[0].index
        const selectedEvent = chartData.items[index]

        handleClick(selectedEvent)
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
        const { barColor, labelColor, ...newItem } = chartData.items[index]

        handleMouseEnter(newItem)
        chart.canvas.style.setProperty('cursor', 'pointer')
      } else {
        handleMouseLeave()
        chart.canvas.style.removeProperty('cursor')
      }
    },
  }
}
