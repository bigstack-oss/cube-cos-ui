import {
  ActiveElement,
  ChartData,
  ChartOptions,
  FontSpec,
  TooltipCallbacks,
} from 'chart.js'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { hexToRGBA } from '@cube-frontend/utils'
import { getTypography } from '@cube-frontend/ui-theme'

export type BaseData = {
  id: string
  label: string
  value: number
}

export type ColumnChartData<T extends BaseData> = T & {
  barColor: string
  labelColor: string
}

export type ReturnChartData<T extends BaseData> = ChartData<
  'bar',
  number[],
  string
> & {
  items: ColumnChartData<T>[]
}

export const chartFontFamily = cubeTheme.fontFamily.inter[0]

// TODO: make the `getChartXXX` functions as shared utilities
// since they are used in across multiple chart types (e.g., pie, bar, and line).
export const getChartYAxisTitleFont = (): Partial<FontSpec> => {
  const body5 = getTypography('primary-body5')
  const fontSize = Number(body5.fontSize.replace('px', ''))
  const lineHeight = body5.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartTooltipTitleFont = (): Partial<FontSpec> => {
  const body2 = getTypography('primary-body2')
  const fontSize = Number(body2.fontSize.replace('px', ''))
  const lineHeight = body2.lineHeight
  const fontWeight = Number(cubeTheme.fontWeight.semibold)

  return {
    family: chartFontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  }
}

export const getChartTooltipBodyFont = (): Partial<FontSpec> => {
  const body3 = getTypography('primary-body3')
  const fontSize = Number(body3.fontSize.replace('px', ''))
  const lineHeight = body3.lineHeight

  return {
    family: chartFontFamily,
    size: fontSize,
    lineHeight,
  }
}

export const getChartData = <T extends BaseData>(
  dataSet: T[],
  targetData: T | undefined,
): ReturnChartData<T> | undefined => {
  if (dataSet.length === 0) return undefined

  const items = dataSet.map((data) => {
    const isBlur = !!targetData && targetData.id !== data.id

    const originalBarColor = cubeTheme.colors.chart[2]
    const originalLabelColor = cubeTheme.colors.functional.text

    const barColorWithOpacity = isBlur
      ? hexToRGBA(originalBarColor, 0.3)
      : originalBarColor

    const labelColorWithOpacity = isBlur
      ? hexToRGBA(originalLabelColor, 0.3)
      : originalLabelColor

    return {
      ...data,
      barColor: barColorWithOpacity,
      labelColor: labelColorWithOpacity,
    }
  })

  return {
    labels: items.map((item) => item.label),
    datasets: [
      {
        data: items.map((item) => item.value || 0),
        backgroundColor: items.map((item) => item.barColor),
        hoverBackgroundColor: cubeTheme.colors.chart[2],
        barThickness: 9,
        borderRadius: 2,
      },
    ],
    items,
  }
}

type GetChartOptionsProps<T extends BaseData> = {
  yAxisTitle: string
  chartData: ReturnChartData<T> | undefined
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick: (data: T) => void
  onBarHover: (data: T) => void
  onEmptyHover: () => void
}

export const getChartOptions = <T extends BaseData>(
  props: GetChartOptionsProps<T>,
): ChartOptions<'bar'> => {
  const {
    yAxisTitle,
    chartData,
    tooltipCallbackFn,
    onBarClick,
    onBarHover,
    onEmptyHover,
  } = props

  if (!chartData) return {} as ChartOptions<'bar'>

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
          text: yAxisTitle,
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
        callbacks: tooltipCallbackFn?.(),
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

        onBarClick?.(selectedEvent)
      } else {
        console.warn('No available data')
      }
    },
    // Chart.js onHover fires on every pointer move, not only on enter/leave.
    onHover: (_, elements: ActiveElement[], chart) => {
      if (elements.length > 0) {
        const index = elements[0].index
        onBarHover(chartData.items[index])
        chart.canvas.style.setProperty('cursor', 'pointer')
      } else {
        onEmptyHover()
        chart.canvas.style.removeProperty('cursor')
      }
    },
  }
}
