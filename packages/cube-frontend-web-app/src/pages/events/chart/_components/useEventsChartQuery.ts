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
  // Common
  type: GetEventsTypeEnum
  past: ChartTimeRanges
  proportionCategory: string[] | undefined
  comparisonCategory: string[] | undefined
  // System
  proportionSeverity: string[] | undefined
  comparisonSeverity: string[] | undefined
  // Host
  proportionHost: string[] | undefined
  comparisonHost: string[] | undefined
  // Instance
  proportionInstance: string[] | undefined
  comparisonInstance: string[] | undefined
}

type UseEventsChartQuery = {
  chartQuery: ChartQuery
  onTypeChange: (type: GetEventsTypeEnum) => void
  onTimeRangeChange: (timeRange: ChartTimeRanges) => void
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: string,
  ) => void
  onFieldAllSelect: <Key extends FilterKeys>(
    key: Key,
    options: FilterOptions[Key],
  ) => void
  onFieldReset: <Key extends FilterKeys>(key: Key) => void
}

export const useEventsChartQuery = (): UseEventsChartQuery => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [chartQuery, setChartQuery] = useState<ChartQuery>(() =>
    initChartQuery(searchParams),
  )

  useEffect(() => {
    const params = new URLSearchParams()

    Object.entries(chartQuery).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        const unique = [...new Set(value)]
        unique.forEach((item) => {
          params.append(key, item)
        })
      } else if (value !== undefined) {
        params.set(key, value.toString())
      }
    })

    setSearchParams(params, {
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

  const onFieldChange = <Key extends FilterKeys>(
    key: Key,
    value: string,
  ): void => {
    setChartQuery((prev) => {
      const current = (prev[key] ?? []) as string[]
      const isSelected = current.includes(value)

      const updated = isSelected
        ? current.filter((item) => item !== value)
        : [...current, value]

      return {
        ...prev,
        [key]: updated.length > 0 ? updated : [],
      }
    })
  }

  const onFieldAllSelect = <Key extends FilterKeys>(
    key: Key,
    options: FilterOptions[Key],
  ): void => {
    setChartQuery((prev) => {
      const current = (prev[key] ?? []) as string[]
      const isAllSelected =
        current.length === options.length &&
        options.every((item) => current.includes(item))

      return { ...prev, [key]: isAllSelected ? [] : options }
    })
  }

  const onFieldReset = <Key extends keyof FilterOptions>(key: Key): void => {
    setChartQuery((prev) => ({ ...prev, [key]: undefined }))
  }

  return {
    chartQuery,
    onTypeChange,
    onTimeRangeChange,
    onFieldChange,
    onFieldAllSelect,
    onFieldReset,
  }
}
