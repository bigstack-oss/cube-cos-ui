import { toUnitDisplay } from '@cube-frontend/web-app/utils/unit'
import { ChartDataset, ChartData, ChartOptions, FontSpec } from 'chart.js'
import { last } from 'lodash'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { formatChartXAxisTime } from '@cube-frontend/web-app/utils/date'

enum DATASET_LABELS {
  Read = 'Read',
  Write = 'Write',
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
    fill: true,
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

const fontFamily = cubeTheme.fontFamily.inter[0]

const getTitleFont = (): Partial<FontSpec> => {
  const body2 = cubeTheme.fontSize['primary-body2']
  const fontSize = Number(body2[0].replace('px', ''))
  const lineHeight = body2[1].lineHeight
  const fontWeight = Number(cubeTheme.fontWeight.semibold)

  return {
    family: fontFamily,
    size: fontSize,
    weight: fontWeight,
    lineHeight,
  }
}

const titleFont = getTitleFont()

const getBodyFont = (): Partial<FontSpec> => {
  const body3 = cubeTheme.fontSize['primary-body3']
  const fontSize = Number(body3[0].replace('px', ''))
  const lineHeight = body3[1].lineHeight

  return {
    family: fontFamily,
    size: fontSize,
    lineHeight,
  }
}

const getYAxisTitleFont = (): Partial<FontSpec> => {
  const body5 = cubeTheme.fontSize['primary-body5']
  const fontSize = Number(body5[0].replace('px', ''))
  const lineHeight = body5[1].lineHeight

  return {
    family: fontFamily,
    size: fontSize,
    lineHeight,
  }
}
const yAxisTitleFont = getYAxisTitleFont()

const bodyFont = getBodyFont()

export const getChartOptions = (props: {
  unit: string
  unitSuffix: string
  isLoading: boolean
  formatter: Formatter
}): ChartOptions<'line'> => {
  const { unit, unitSuffix, isLoading, formatter } = props

  return {
    maintainAspectRatio: false,
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    font: {
      family: fontFamily,
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
          font: yAxisTitleFont,
        },
        border: {
          display: false,
        },
        ticks: {
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
        titleFont,
        bodyFont,
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
            return `${context.dataset.label}: ${formattedValue} ${unitDisplay}`
          },
        },
      },
    },
  }
}
