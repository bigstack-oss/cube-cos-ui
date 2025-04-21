import {
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
  GetEventsTypeEnum,
  GetRankedEventsPastEnum,
} from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { BarChart } from './BarChart/BarChart'
import { FilterDropdown } from '../FilterDropdown'
import { useRankedEvents } from '../useRankedEvents'
import { ChartType, mapToDropdownFilterValues } from '../utils'
import { ChartEmpty } from '../ChartEmpty'
import { FilterEmpty } from '../FilterEmpty'

type EventsChartComparisonProps = {
  isEventsFilterLoading: boolean
  eventsFilter:
    | GetEventFilterConditionResponseDataSystem
    | GetEventFilterConditionResponseDataHost
    | GetEventFilterConditionResponseDataInstance
    | undefined
  eventsType: GetEventsTypeEnum
  handleEventsQueryChange: (updates: Record<string, string | null>) => void
  currentQuery: Record<string, string>
  getRedirectQuery: (chartType: ChartType, eventId: string) => string
  past: GetRankedEventsPastEnum
}

export const EventsChartComparison = (props: EventsChartComparisonProps) => {
  const {
    isEventsFilterLoading,
    eventsFilter,
    eventsType,
    handleEventsQueryChange,
    currentQuery,
    getRedirectQuery,
    past,
  } = props

  const chartType: ChartType = 'comparison'

  const { isRankedEventsLoading, rankedEvents } = useRankedEvents({
    eventsType,
    chartType,
    past,
  })

  const hasFilter = !!eventsFilter

  const isChartEmpty = !rankedEvents || rankedEvents.length === 0

  const renderFilters = () => {
    if (!hasFilter) return <FilterEmpty />

    return Object.entries(eventsFilter).map(([key, options]) => {
      const { dropdownFilterLabel, queryKey } = mapToDropdownFilterValues(
        chartType,
        key,
      )
      return (
        <FilterDropdown
          key={key}
          isLoading={isEventsFilterLoading}
          filterKey={queryKey}
          filterLabel={dropdownFilterLabel}
          options={options}
          selectedValue={currentQuery?.[queryKey]}
          onChange={handleEventsQueryChange}
        />
      )
    })
  }

  const renderChart = () => {
    if (isChartEmpty) return <ChartEmpty />

    return (
      <div className="w-full px-5 py-3">
        <BarChart
          chartType={chartType}
          getRedirectQuery={getRedirectQuery}
          rankedEvents={rankedEvents}
          isRankedEventsLoading={isRankedEventsLoading}
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
