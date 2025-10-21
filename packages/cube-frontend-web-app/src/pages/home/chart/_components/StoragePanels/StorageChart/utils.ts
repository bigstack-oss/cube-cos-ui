import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import {
  chartFontFamily,
  getChartTicksOptions,
  getChartTooltipBodyFont,
  getChartTooltipTitleFont,
  getChartYAxisTitleFont,
} from '@cube-frontend/web-app/utils/chart'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'
import { toUnitDisplay } from '@cube-frontend/web-app/utils/unit'
import { ChartData, ChartDataset, ChartOptions } from 'chart.js'
import { last } from 'lodash'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

enum DATASET_LABELS {
  Read = 'read',
  Write = 'write',
}

export type Formatter = (value: number) => string | number

export type TimeValue = {
  time: string
  value: number
}

const labelColors = {
  [DATASET_LABELS.Read]: cubeTheme.colors.chart[1],
  [DATASET_LABELS.Write]: cubeTheme.colors.chart[2],
}

const getDataset = (props: {
  label: string
  data: TimeValue[]
  borderColor: string
}): ChartDataset<'line', number[]> => {
  const { label, data, borderColor } = props

  return {
    label,
    data: data.map((item) => item.value),
    borderColor: borderColor,
    fill: false,
    tension: 0.1,
  }
}

export const getLastValue = (data: TimeValue[]) => last(data)?.value ?? 0

export const getLineChartData = (props: {
  read: TimeValue[]
  write: TimeValue[]
}): ChartData<'line', number[], string> => {
  const { read, write } = props

  return {
    labels: read.map((item) => formatChartXAxisTime(item.time)),
    datasets: [
      {
        label: DATASET_LABELS.Read,
        // label: 'HELLO',
        data: read,
        borderColor: cubeTheme.colors.chart[1],
      },
      {
        label: DATASET_LABELS.Write,
        data: write,
        borderColor: cubeTheme.colors.chart[2],
      },
    ].map(getDataset),
  }
}

export const useChartOptions = (props: {
  unit: string
  unitSuffix: string
  isLoading: boolean
  formatter: Formatter
}): ChartOptions<'line'> => {
  const { unit, unitSuffix, isLoading, formatter } = props

  const { t } = useTranslation()

  return useMemo(
    () => ({
      responsive: true,
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
            text: toUnitDisplay(unit, unitSuffix),
            font: getChartYAxisTitleFont(),
          },
          border: {
            display: false,
          },
          ticks: {
            ...getChartTicksOptions(),
            callback: (tickValue, index) => {
              if (isLoading) {
                return `${index * 100}`
              }
              return formatter(tickValue as number)
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
            labelColor: (tooltipItem) => {
              const dataSetLabel = tooltipItem.dataset.label as DATASET_LABELS
              const labelColor = labelColors[dataSetLabel]
              return {
                borderColor: labelColor,
                backgroundColor: labelColor,
              }
            },
            label: (context) => {
              const formattedValue = formatter(context.parsed.y)
              const unitDisplay = toUnitDisplay(unit, unitSuffix)
              const labelDisplay = t(
                `home.chart.storage.${context.dataset.label as DATASET_LABELS}`,
              )

              return `${labelDisplay}: ${formattedValue} ${unitDisplay}`
            },
          },
        },
      },
    }),
    [unit, unitSuffix, isLoading, formatter, t],
  )
}
