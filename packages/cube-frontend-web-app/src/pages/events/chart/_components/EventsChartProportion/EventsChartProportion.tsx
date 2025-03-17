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
import { useRankedEvents } from '../useRankedEvents'
import { ChartType, mapToDropdownFilterValues } from '../utils'
import { mockRankedEvents } from '../mockData'

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

  const { isRankedEventsLoading } = useRankedEvents({
    eventsType,
    chartType,
    past,
  })

  if (!eventsFilter) return

  return (
    <CosGeneralPanel
      topic="Event ID Proportion"
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
      {/** TODO: Replace `rankedEvents` with `rankedEvents` from useRankedEvents */}
      <PieChart
        chartType={chartType}
        getRedirectQuery={getRedirectQuery}
        rankedEvents={mockRankedEvents()}
        isRankedEventsLoading={isRankedEventsLoading}
      />
    </CosGeneralPanel>
  )
}
