import {
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
} from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { BarChart } from './BarChart/BarChart'
import { FilterDropdown } from '../FilterDropdown'
import { useRankedEvents } from '../useRankedEvents'
import {
  ChartType,
  FilterKeysResponse,
  getFilterKeyByChartType,
  getFilterLabel,
} from '../utils'
import { ChartEmpty } from '../ChartEmpty'
import { FilterEmpty } from '../FilterEmpty'
import { ChartQuery, FilterOptions } from '../useEventsChartQuery'

const chartType: ChartType = 'comparison'

type EventsChartComparisonProps = {
  isEventsFilterLoading: boolean
  eventsFilter:
    | GetEventFilterConditionResponseDataSystem
    | GetEventFilterConditionResponseDataHost
    | GetEventFilterConditionResponseDataInstance
    | undefined

  chartQuery: ChartQuery
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: string,
  ) => void
  onFieldAllSelect: <Key extends keyof FilterOptions>(
    key: Key,
    options: FilterOptions[Key],
  ) => void
}

export const EventsChartComparison = (props: EventsChartComparisonProps) => {
  const {
    isEventsFilterLoading,
    eventsFilter,
    chartQuery,
    onFieldChange,
    onFieldAllSelect,
  } = props

  const { isRankedEventsLoading, rankedEvents } = useRankedEvents(
    chartType,
    chartQuery,
  )

  const renderFilters = () => {
    if (!eventsFilter) return <FilterEmpty />

    return Object.entries(eventsFilter).map(([key, options]) => {
      const filterLabel = getFilterLabel(key as FilterKeysResponse)
      const filterKey = getFilterKeyByChartType(
        chartType,
        key as FilterKeysResponse,
      )

      if (!filterKey) return null
      return (
        <FilterDropdown
          key={`${chartQuery.type}-${chartType}-${filterKey}`}
          isLoading={isEventsFilterLoading}
          filterKey={filterKey}
          filterLabel={filterLabel}
          options={options}
          selectedValue={chartQuery[filterKey]}
          onFieldChange={onFieldChange}
          onFieldAllSelect={onFieldAllSelect}
        />
      )
    })
  }

  const renderChart = () => {
    if (rankedEvents.length === 0) return <ChartEmpty />

    return (
      <div className="w-full px-5 py-3">
        <BarChart
          isRankedEventsLoading={isRankedEventsLoading}
          rankedEvents={rankedEvents}
          chartQuery={chartQuery}
        />
      </div>
    )
  }

  return (
    <CosGeneralPanel
      topic="Event ID Comparison (Top 24)"
      dropdown={
        <div className="flex items-center gap-2">{renderFilters()}</div>
      }
    >
      {renderChart()}
    </CosGeneralPanel>
  )
}
