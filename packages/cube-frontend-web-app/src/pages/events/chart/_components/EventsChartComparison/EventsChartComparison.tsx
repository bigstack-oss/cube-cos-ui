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
import { mockRankedEvents } from '../mockData'
import { ChartType, mapToDropdownFilterValues } from '../utils'

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

  const { isRankedEventsLoading } = useRankedEvents({
    eventsType,
    chartType,
    past,
  })

  if (!eventsFilter) return

  return (
    <CosGeneralPanel
      topic="Event ID Comparison (Top 24)"
      dropdown={
        <div className="flex items-center gap-2">
          {Object.entries(eventsFilter).map(([key, options]) => {
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
          })}
        </div>
      }
    >
      <div className="w-full px-5 py-3">
        {/** TODO: Replace `rankedEvents` with `rankedEvents` from useRankedEvents */}
        <BarChart
          chartType={chartType}
          getRedirectQuery={getRedirectQuery}
          rankedEvents={mockRankedEvents()}
          isRankedEventsLoading={isRankedEventsLoading}
        />
      </div>
    </CosGeneralPanel>
  )
}
