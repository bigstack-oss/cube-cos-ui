import { ActiveElement, ChartData, ChartOptions } from 'chart.js'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { GetRankedEventsResponseDataEventsInner } from '@cube-frontend/api'

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

const convertHexToRGBA = (hexCode: string) => {
  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return `rgba(${r},${g},${b},0.3)`
}

type ReturnChartData = ChartData<'pie', number[], string> & {
  items: { id: string; color: string; percentage: number }[]
}

export const getChartData = (
  events: GetRankedEventsResponseDataEventsInner[] = [],
  hoveredItemKey: string | undefined,
): ReturnChartData | undefined => {
  if (!events.length) return undefined

  /**
   * Sort the events in descending order based on the 'percent' field
   * and slice to keep only the top 24 events
   */
  const sortedEvents = [...events]
    .sort((a, b) => b.percent - a.percent)
    .slice(0, 24)

  const items = sortedEvents.map((event, index) => {
    const id = event.id?.toString() || 'Unknown'

    const percentage = event.percent || 0

    /**
     * Determine whether the event is in a "blur" state
     * isBlur  =>  Reduce its opacity by using the `convertHexToRGBA` function
     * !isBlur =>  Keep the original color
     */
    const isBlur = !!hoveredItemKey && id !== hoveredItemKey

    const originalColor = chartColors[index % chartColors.length]

    const colorWithOpacity = isBlur
      ? convertHexToRGBA(originalColor)
      : originalColor

    return {
      id,
      color: colorWithOpacity,
      percentage,
    }
  })

  return {
    labels: items.map((item) => item.id),
    datasets: [
      {
        data: sortedEvents.map((event) => event.percent || 0),
        backgroundColor: items.map((item) => item.color),
      },
    ],
    items,
  }
}

export const getChartOptions = (
  chartData: ReturnChartData | undefined,
  setTargetEventKey: React.Dispatch<React.SetStateAction<string | undefined>>,
  handleClick: () => void,
): ChartOptions<'pie'> => {
  return {
    responsive: true,
    font: {
      family: cubeTheme.fontFamily.inter[0],
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: {
          top: 8,
          bottom: 8,
          left: 12,
          right: 12,
        },
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
            return `${value}%`
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
      if (!chartData) {
        console.warn('No available data')
        return
      }

      if (elements.length > 0) {
        /**
         * Get the index of the hovered slice
         * And access the `id` from `items` array based on the index
         */
        const index = elements[0].index
        const hoveredId = chartData.items[index]?.id
        setTargetEventKey(hoveredId)
        chart.canvas.style.setProperty('cursor', 'pointer')
      } else {
        setTargetEventKey(undefined)
        chart.canvas.style.removeProperty('cursor')
      }
    },
  }
}
