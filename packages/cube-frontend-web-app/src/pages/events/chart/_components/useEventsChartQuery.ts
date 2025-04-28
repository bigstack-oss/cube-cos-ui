import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { initChartQuery } from './utils'
import { ChartTimeRanges } from './timeRangeUtils'

export type FilterKeys = Extract<
  keyof ChartQuery,
  | 'proportionCategory'
  | 'comparisonCategory'
  | 'proportionSeverity'
  | 'comparisonSeverity'
  | 'proportionHost'
  | 'comparisonHost'
  | 'proportionInstance'
  | 'comparisonInstance'
>

export type FilterOptions = {
  [K in FilterKeys]: NonNullable<ChartQuery[K]>
}

export type ChartQuery = {
  type: GetEventsTypeEnum
  past: ChartTimeRanges
  proportionCategory: string | undefined
  comparisonCategory: string | undefined
  // System
  proportionSeverity: string | undefined
  comparisonSeverity: string | undefined
  // Host
  proportionHost: string | undefined
  comparisonHost: string | undefined
  // Instance
  proportionInstance: string | undefined
  comparisonInstance: string | undefined
}

type UseEventsChartQuery = {
  chartQuery: ChartQuery
  onTypeChange: (type: GetEventsTypeEnum) => void
  onTimeRangeChange: (timeRange: ChartTimeRanges) => void
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key] | undefined,
  ) => void
}

export const useEventsChartQuery = (): UseEventsChartQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [chartQuery, setChartQuery] = useState<ChartQuery>(
    initChartQuery(searchParams),
  )

  useEffect(() => {
    const record = Object.entries(chartQuery).reduce(
      (result, [key, value]) => {
        const stringValue = value?.toString()
        if (stringValue) {
          result[key] = stringValue
        }
        return result
      },
      {} as Record<string, string>,
    )

    setSearchParams(record, {
      replace: true,
    })
  }, [chartQuery, setSearchParams])

  const onTypeChange = (type: GetEventsTypeEnum): void => {
    setChartQuery((prev) => ({
      ...prev,
      type,
    }))
  }

  const onTimeRangeChange = (timeRange: ChartTimeRanges): void => {
    setChartQuery((prev) => ({
      ...prev,
      past: timeRange,
    }))
  }

  const onFieldChange = <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key] | undefined,
  ): void => {
    setChartQuery((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return {
    chartQuery,
    onTypeChange,
    onTimeRangeChange,
    onFieldChange,
  }
}
