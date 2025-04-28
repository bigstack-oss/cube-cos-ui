import {
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
} from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { PieChart } from './PieChart/PieChart'
import { FilterDropdown } from '../FilterDropdown'
import { FilterEmpty } from '../FilterEmpty'
import { useRankedEvents } from '../useRankedEvents'
import {
  ChartType,
  FilterKeysResponse,
  getFilterKeyByChartType,
  getFilterLabel,
} from '../utils'
import { ChartEmpty } from '../ChartEmpty'
import { ChartQuery, FilterOptions } from '../useEventsChartQuery'

const chartType: ChartType = 'proportion'

type EventsChartProportionProps = {
  isEventsFilterLoading: boolean
  eventsFilter:
    | GetEventFilterConditionResponseDataSystem
    | GetEventFilterConditionResponseDataHost
    | GetEventFilterConditionResponseDataInstance
    | undefined
  chartQuery: ChartQuery
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key] | undefined,
  ) => void
}

export const EventsChartProportion = (props: EventsChartProportionProps) => {
  const { isEventsFilterLoading, eventsFilter, chartQuery, onFieldChange } =
    props

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
        />
      )
    })
  }

  const renderChart = () => {
    if (!rankedEvents || rankedEvents.length === 0) return <ChartEmpty />

    return (
      <PieChart
        isRankedEventsLoading={isRankedEventsLoading}
        rankedEvents={rankedEvents}
        chartType={chartType}
        chartQuery={chartQuery}
      />
    )
  }

  return (
    <CosGeneralPanel
      topic="Event ID Proportion"
      dropdown={
        <div className="flex items-center gap-2">{renderFilters()}</div>
      }
    >
      {renderChart()}
    </CosGeneralPanel>
  )
}
