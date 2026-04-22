import {
  HostMetricHistoryResponseData,
  TimeValuePair,
} from '@cube-frontend/api'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeUtils'
import type { SupportedLanguage } from '@cube-frontend/web-app/i18n/utils'
import { convertSize, SizeUnit } from '@cube-frontend/web-app/utils/byte'
import {
  chartFontFamily,
  getChartTicksOptions,
  getChartTooltipBodyFont,
  getChartTooltipTitleFont,
  getChartYAxisTitleFont,
} from '@cube-frontend/web-app/utils/chart'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'
import { ChartData, ChartOptions, Scale, Tick } from 'chart.js'
import dayjs from 'dayjs'

export const chartTimeRanges = [
  '1h',
  '24h',
  '7d',
  '14d',
] as const satisfies TimeRange[]

const cpuLineColor = cubeTheme.colors.chart[1]
const memoryLineColor = cubeTheme.colors.chart[2]

export const computeChartData = (
  metricsData:
    | HostMetricHistoryResponseData
    | HostMetricHistoryResponseData
    | undefined,
  type: 'cpu' | 'memory',
): ChartData<'line', number[]> => {
  const { history } = metricsData ?? {}

  if (!history) {
    return {
      labels: [],
      datasets: [],
    }
  }

  return {
    labels: history.map((pair) => formatChartXAxisTime(pair.time)),
    datasets: [
      {
        data: history.map((pair) => pair.value),
        borderColor: type === 'cpu' ? cpuLineColor : memoryLineColor,
        fill: false,
        tension: 0.1,
      },
    ],
  }
}

export const getCpuChartOptions = (
  metricsData: HostMetricHistoryResponseData | undefined,
  yAxisText: string,
  i18nLanguage: SupportedLanguage,
): ChartOptions<'line'> => {
  const { history = [], unit = '' } = metricsData ?? {}
  return {
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    font: {
      family: chartFontFamily,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: getChartTicksOptions(),
        beforeFit: (axis) => {
          transformTickLabelsBeforeFit(axis, history, i18nLanguage)
        },
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: yAxisText,
          font: getChartYAxisTitleFont(),
          color: cubeTheme.colors.functional['text-light'],
        },
        border: {
          display: false,
        },
        ticks: getChartTicksOptions(),
      },
    },
    elements: {
      point: {
        radius: 0,
      },
      line: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        titleColor: cubeTheme.colors.primary[200],
        usePointStyle: true,
        titleFont: getChartTooltipTitleFont(),
        bodyFont: getChartTooltipBodyFont(),
        boxPadding: 4,
        callbacks: {
          title: (tooltipItems) => {
            if (!tooltipItems.length) return ''
            const { dataIndex } = tooltipItems[0]
            const pair = history[dataIndex]
            return formatTooltipTitle(pair)
          },
          labelPointStyle: () => ({
            pointStyle: 'line',
            rotation: 0,
          }),
          labelColor: () => {
            return {
              borderColor: cpuLineColor,
              backgroundColor: cpuLineColor,
            }
          },
          label: (tooltipItem) => {
            if (tooltipItem.parsed.y == null) return ''

            const value = tooltipItem.parsed.y.toFixed(2)
            // TODO: Define an enum for `unit` in the API docs.
            const unitText = unit === 'percentage' ? '%' : ` ${unit}`
            return `${value}${unitText}`
          },
        },
      },
    },
  }
}
export const getMemoryChartOptions = (
  metricsData: HostMetricHistoryResponseData | undefined,
  yAxisText: string,
  i18nLanguage: SupportedLanguage,
): ChartOptions<'line'> => {
  const isLoading = !metricsData
  const history = metricsData?.history ?? []
  const originalUnit = (metricsData?.unit.replace('size', '') ??
    'MiB') as SizeUnit

  return {
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    font: {
      family: chartFontFamily,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: getChartTicksOptions(),
        beforeFit: (axis) => {
          transformTickLabelsBeforeFit(axis, history, i18nLanguage)
        },
      },
      y: {
        title: {
          display: true,
          text: yAxisText,
          font: getChartYAxisTitleFont(),
        },
        border: {
          display: false,
        },
        ticks: {
          ...getChartTicksOptions(),
          callback: (tickValue, index) => {
            if (isLoading) return index * 10

            const value = Number(tickValue)
            const GiB = convertSize(value, {
              fromUnit: originalUnit,
              toUnit: 'GiB',
            })
            return GiB
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        padding: 12,
        titleColor: cubeTheme.colors.primary[200],
        usePointStyle: true,
        titleFont: getChartTooltipTitleFont(),
        bodyFont: getChartTooltipBodyFont(),
        boxPadding: 4,
        callbacks: {
          title: (tooltipItems) => {
            if (!tooltipItems.length) return ''
            const { dataIndex } = tooltipItems[0]
            const pair = history[dataIndex]
            return formatTooltipTitle(pair)
          },
          labelPointStyle: () => ({
            pointStyle: 'line',
            rotation: 0,
          }),
          labelColor: () => {
            return {
              borderColor: memoryLineColor,
              backgroundColor: memoryLineColor,
            }
          },
          label: (tooltipItem) => {
            const value = tooltipItem.parsed.y ?? 0
            const GiB = convertSize(value, {
              fromUnit: originalUnit,
              toUnit: 'GiB',
            })
            return `${GiB} GiB`
          },
        },
      },
    },
  }
}

const formatTooltipTitle = (pair: TimeValuePair): string => {
  return dayjs.respectTzOffset(pair.time).format('YYYY-MM-DD HH:mm')
}

type TickWithContext = Tick & {
  // NOTE: Chart.js does not expose a type for ticks with `$context`,
  // but this property is available at runtime.
  $context: {
    /**
     * The index of the source item this tick is generated from.
     */
    index: number
  }
}

const transformTickLabelsBeforeFit = (
  axis: Scale,
  history: TimeValuePair[],
  i18nLanguage: SupportedLanguage,
): void => {
  const { ticks } = axis

  let prevDate: string | undefined = undefined

  ticks.forEach((tick) => {
    const castedTick = tick as TickWithContext
    const timeValuePair = history[castedTick.$context.index]
    if (!timeValuePair) return

    const dateWithTz = dayjs
      .respectTzOffset(timeValuePair.time.toString())
      .locale(i18nLanguage)
    const dateString = dateWithTz.format('YYYY-MM-DD')

    if (prevDate !== dateString) {
      tick.label = dateWithTz.format('MMM DD HH:mm')
    } else {
      tick.label = dateWithTz.format('HH:mm')
    }

    prevDate = dateString
  })
}
