import { RefObject, useCallback, useMemo, useRef, useState } from 'react'
import {
  ColumnChartData,
  BaseData,
  getChartData,
  getChartOptions,
  ReturnChartData,
} from './cosColumnChartUtils'
import { ChartOptions, TooltipCallbacks } from 'chart.js'

type UseCosColumnChartOption<T extends BaseData> = {
  dataSet: T[]
  yAxisTitle: string
  tooltipCallbackFn?: () => TooltipCallbacks<'bar'>
  onBarClick?: (bar: T) => void
  onBarHover?: (data: T) => void
  onEmptyHover?: () => void
}

type UseCosColumnChart<T extends BaseData> = {
  hoveredDataIndexRef: RefObject<number | null>
  chartOptions: ChartOptions<'bar'>
  targetData: T | undefined
  chartData: ReturnChartData<T> | undefined
}

export const useCosColumnChart = <T extends BaseData>(
  options: UseCosColumnChartOption<T>,
): UseCosColumnChart<T> => {
  const {
    dataSet,
    yAxisTitle,
    tooltipCallbackFn,
    onBarClick: onBarClickProp,
    onBarHover: onBarHoverProp,
    onEmptyHover: onEmptyHoverProp,
  } = options

  const hoveredDataIndexRef = useRef<number | null>(null)

  const [targetData, setTargetData] = useState<T | undefined>(undefined)

  const chartData = useMemo(
    () => getChartData(dataSet, targetData),
    [dataSet, targetData],
  )

  const onBarClick = useCallback(
    (bar: T) => {
      onBarClickProp?.(bar)
    },
    [onBarClickProp],
  )

  const onBarHover = useCallback(
    (data: T) => {
      onBarHoverProp?.(data)
      if (data.id !== targetData?.id && chartData) {
        const index = chartData.items.findIndex(
          (item: ColumnChartData<T>) => item.id === data.id,
        )

        if (index !== -1) {
          hoveredDataIndexRef.current = index
        }

        setTargetData(data)
      }
    },
    [onBarHoverProp, targetData?.id, chartData],
  )

  const onEmptyHover = useCallback(() => {
    onEmptyHoverProp?.()
    hoveredDataIndexRef.current = null
    setTargetData(undefined)
  }, [onEmptyHoverProp])

  const chartOptions = useMemo(
    () =>
      getChartOptions({
        yAxisTitle,
        chartData,
        tooltipCallbackFn,
        onBarHover,
        onEmptyHover,
        onBarClick,
      }),
    [
      chartData,
      onBarClick,
      onBarHover,
      onEmptyHover,
      tooltipCallbackFn,
      yAxisTitle,
    ],
  )

  return {
    hoveredDataIndexRef,
    chartOptions,
    targetData,
    chartData,
  }
}
