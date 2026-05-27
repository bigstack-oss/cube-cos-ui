import Chart from '@cube-frontend/ui-library/icons/monochrome/chart.svg?react'
import {
  Chart as ChartJS,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  TooltipCallbacks,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'
import { cubeTheme } from '@cube-frontend/ui-theme/src/cubeTheme'
import { hexToRGBA } from '@cube-frontend/utils'
import { getTypography } from '@cube-frontend/ui-theme'
import { CosColumnChartSkeleton } from './CosColumnChartSkeleton'
import { BaseData } from './cosColumnChartUtils'
import { useCosColumnChart } from './useCosColumnChart'
import { useUILibraryTranslation } from '../../../i18n/useUILibraryTranslation'

ChartJS.register(
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
)

export type CosColumnChartProps<T extends BaseData> = {
  isLoading?: boolean
  data: T[]
  yAxisTitle: string
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick?: (bar: T) => void
  onBarHover?: (data: T) => void
  onEmptyHover?: () => void
}

export const CosColumnChart = <T extends BaseData>(
  props: CosColumnChartProps<T>,
) => {
  const {
    isLoading = false,
    data,
    yAxisTitle,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover,
    onEmptyHover,
  } = props

  const { t } = useUILibraryTranslation()

  const { hoveredDataIndexRef, chartOptions, chartData } = useCosColumnChart({
    dataSet: data,
    yAxisTitle,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover,
    onEmptyHover,
  })

  if (isLoading) return <CosColumnChartSkeleton />

  if (!chartData) {
    return (
      <div className="flex w-full flex-col items-center px-4 py-6">
        <Chart className="icon-xl m-2.5 text-functional-text" />
        <p className="primary-body2 text-functional-text-light">
          {t('component.dropdown.noData')}
        </p>
      </div>
    )
  }

  return (
    <div className="relative h-[385px]">
      <Bar
        data={chartData}
        options={chartOptions}
        plugins={[
          {
            id: 'drawValuePlugin',
            afterDatasetsDraw: (chart: ChartJS) => {
              const ctx = chart.ctx
              const typography = getTypography('primary-body5')

              ctx.font = `${typography.fontSize} ${typography.fontFamily}`
              ctx.textAlign = 'center'

              chart.data.datasets.forEach(
                (dataset: ChartJS['data']['datasets'][0], i: number) => {
                  const meta = chart.getDatasetMeta(i)

                  meta.data.forEach(
                    (bar: { x: number; y: number } | null, index: number) => {
                      if (!bar) return

                      const value = dataset.data[index] as number
                      const labelColor = cubeTheme.colors.functional.text

                      ctx.fillStyle =
                        hoveredDataIndexRef.current === null ||
                        hoveredDataIndexRef.current === index
                          ? labelColor
                          : hexToRGBA(labelColor, 0.3)
                      ctx.fillText(value.toString(), bar.x, bar.y - 8)
                    },
                  )
                },
              )
            },
          },
        ]}
        className="min-w-0"
      />
    </div>
  )
}
