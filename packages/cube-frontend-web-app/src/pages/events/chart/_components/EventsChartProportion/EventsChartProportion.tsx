import {
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
  GetEventsTypeEnum,
  GetRankedEventsPastEnum,
} from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { PieChart } from './PieChart/PieChart'
import { FilterDropdown } from '../FilterDropdown'
import { FilterEmpty } from '../FilterEmpty'
import { useRankedEvents } from '../useRankedEvents'
import { ChartType, mapToDropdownFilterValues } from '../utils'
import { ChartEmpty } from '../ChartEmpty'

type EventsChartProportionProps = {
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

export const EventsChartProportion = (props: EventsChartProportionProps) => {
  const {
    isEventsFilterLoading,
    eventsFilter,
    eventsType,
    handleEventsQueryChange,
    currentQuery,
    getRedirectQuery,
    past,
  } = props

  const chartType: ChartType = 'proportion'

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
          key={`${eventsType}-${key}`}
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
      <PieChart
        chartType={chartType}
        getRedirectQuery={getRedirectQuery}
        rankedEvents={rankedEvents}
        isRankedEventsLoading={isRankedEventsLoading}
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
