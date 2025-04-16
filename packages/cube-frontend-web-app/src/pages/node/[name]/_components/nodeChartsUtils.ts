import { HostMetricHistoryResponseData } from '@cube-frontend/api'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { convertSize, SizeUnit } from '@cube-frontend/web-app/utils/byte'
import {
  chartFontFamily,
  getChartTicksOptions,
  getChartTooltipBodyFont,
  getChartTooltipTitleFont,
  getChartYAxisTitleFont,
} from '@cube-frontend/web-app/utils/chart'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'
import { ChartData, ChartOptions } from 'chart.js'

const cpuLineColor = cubeTheme.colors.chart[1]
const memoryLineColor = cubeTheme.colors.chart[2]

export const computeChartData = (
  metricsData:
    | HostMetricHistoryResponseData
    | HostMetricHistoryResponseData
    | undefined,
  type: 'cpu' | 'memory',
): ChartData<'line', number[]> => {
  if (!metricsData) {
    return {
      labels: [],
      datasets: [],
    }
  }
  return {
    labels: metricsData.history.map((pair) => formatChartXAxisTime(pair.time)),
    datasets: [
      {
        data: metricsData.history.map((pair) => pair.value),
        borderColor: type === 'cpu' ? cpuLineColor : memoryLineColor,
        fill: false,
        tension: 0.1,
      },
    ],
  }
}

export const getCpuChartOptions = (unit: string): ChartOptions<'line'> => {
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
      },
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'Consumed Host CPU (%)',
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
  isLoading: boolean,
  originalUnit: SizeUnit,
): ChartOptions<'line'> => {
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
      },
      y: {
        title: {
          display: true,
          text: 'Consumed Host Memory (GB)',
          font: getChartYAxisTitleFont(),
        },
        border: {
          display: false,
        },
        ticks: {
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
            const value = tooltipItem.parsed.y
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
