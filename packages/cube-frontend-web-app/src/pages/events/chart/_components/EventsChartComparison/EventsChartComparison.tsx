import { useTranslation } from 'react-i18next'
import {
  GetEventFilterConditionResponseDataHost,
  GetEventFilterConditionResponseDataInstance,
  GetEventFilterConditionResponseDataSystem,
} from '@cube-frontend/api'
import { CosColumnChart, CosGeneralPanel } from '@cube-frontend/ui-library'
import { FilterDropdown } from '../FilterDropdown'
import { FilterEmpty } from '../FilterEmpty'
import { useFilterLabel } from '../useFilterLabel'
import { ChartQuery, FilterOptions } from '../useEventsChartQuery'
import { useRankedEvents } from '../useRankedEvents'
import {
  ChartType,
  FilterKeysResponse,
  getFilterKeyByChartType,
} from '../utils'
import { useEventsChartComparison } from './useEventsChartComparison'

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

  const { t } = useTranslation()
  const { getFilterLabel } = useFilterLabel()

  const { isRankedEventsLoading, rankedEvents } = useRankedEvents(
    chartType,
    chartQuery,
  )

  const { data, tooltipCallbackFn, onBarClick } = useEventsChartComparison(
    chartQuery,
    rankedEvents,
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

  return (
    <CosGeneralPanel
      topic={t('events.chart.eventIdComparison')}
      rightSlot={
        <div className="flex items-center gap-2">{renderFilters()}</div>
      }
    >
      <div className="w-full px-5 py-3">
        <CosColumnChart
          isLoading={isRankedEventsLoading}
          data={data}
          yAxisTitle={t('events.chart.numberOfOccurrences')}
          tooltipCallbackFn={tooltipCallbackFn}
          onBarClick={onBarClick}
        />
      </div>
    </CosGeneralPanel>
  )
}
