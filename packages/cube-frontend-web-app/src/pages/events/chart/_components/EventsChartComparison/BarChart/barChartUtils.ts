import { ActiveElement, ChartData, ChartOptions, Plugin } from 'chart.js'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'

type ReturnChartData = ChartData<'bar', number[], string> & {
  items: { id: string; number: number }[]
}

export const getChartData = (
  events: GetRankedEventsResponseDataEventsInner[] = [],
): ReturnChartData | undefined => {
  if (!events.length) return undefined

  /**
   * Sort the events in descending order based on the 'percent' field
   * and slice to keep only the top 24 events
   */
  const sortedEvents = [...events]
    .sort((a, b) => b.number - a.number)
    .slice(0, 24)

  const items = sortedEvents.map((event) => {
    const id = event.id?.toString() || 'Unknown'
    const number = event.number || 0
    return {
      id,
      number,
    }
  })

  return {
    labels: items.map((item) => item.id),
    datasets: [
      {
        data: sortedEvents.map((event) => event.number || 0),
        backgroundColor: cubeTheme.colors.chart[2],
        barThickness: 9,
        borderRadius: 2,
      },
    ],
    items,
  }
}

export const drawValuePlugin: Plugin<'bar'> = {
  id: 'drawValuePlugin',
  afterDraw: (chart) => {
    const ctx = chart.ctx
    ctx.font = '11px Inter'
    ctx.fillStyle = '#3F4453'
    ctx.textAlign = 'center'

    chart.data.datasets.forEach((dataset, i) => {
      const meta = chart.getDatasetMeta(i)
      meta.data.forEach((bar, index) => {
        const value = dataset.data[index] as number
        ctx.fillText(value.toString(), bar.x, bar.y - 8)
      })
    })
  },
}

export const getChartOptions = (
  chartData: ReturnChartData | undefined,
  handleClick: (selectedId: string) => void,
): ChartOptions<'bar'> => {
  return {
    responsive: true,
    font: {
      family: cubeTheme.fontFamily.inter[0],
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        titleColor: cubeTheme.colors.primary[200],
        titleMarginBottom: 2,
        callbacks: {
          title: (tooltipItems) => {
            return tooltipItems?.[0].label
          },
          label: (tooltipItem) => {
            const dataset = tooltipItem.dataset.data as number[]
            const value = dataset[tooltipItem.dataIndex] || 0
            return value?.toString()
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
        const selectedId = chartData.items[index]?.id

        handleClick(selectedId)
      } else {
        console.warn('No available data')
      }
    },
  }
}
