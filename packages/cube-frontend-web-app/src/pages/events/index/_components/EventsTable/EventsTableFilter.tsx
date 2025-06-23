import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import {
  CosDatePicker,
  CosIconFrame,
  CosSearchBarFilter,
  DatePickerDates,
  useDatePickerDisplayDates,
} from '@cube-frontend/ui-library'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { EventsContentSwitcher } from './EventsContentSwitcher'
import { FilterDropdown } from './FilterDropdown'
import { FilterKeys, FilterOptions } from './useEventsQuery'
import { useEventsFilter } from './useEventsFilter'
import { EventsQuery, EventsParamKeyEnum } from './utils'

const filterKeyMapping: Record<string, FilterKeys> = {
  categories: EventsParamKeyEnum.Category,
  severities: EventsParamKeyEnum.Severity,
  names: EventsParamKeyEnum.Host,
  ids: EventsParamKeyEnum.Instance,
}

const mapFilterToFilterKey = (key: string): FilterKeys | undefined => {
  return filterKeyMapping[key] || undefined
}

type EventsTableFilterProps = {
  eventsQuery: EventsQuery
  onTypeChange: (type: GetEventsTypeEnum) => void
  onKeywordChange: (keyword: string) => void
  onDatesChange: (dates: DatePickerDates) => void
  onFieldChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: string,
  ) => void
  onFieldAllCheckChange: <Key extends keyof FilterOptions>(
    key: Key,
    value: FilterOptions[Key],
  ) => void
  onFieldClear: <Key extends keyof FilterOptions>(key: Key) => void
}

export const EventsTableFilter = (props: EventsTableFilterProps) => {
  const {
    eventsQuery,
    onTypeChange: onTypeChangeProp,
    onKeywordChange,
    onDatesChange,
    onFieldChange,
    onFieldAllCheckChange,
    onFieldClear,
  } = props

  const {
    type,
    keyword,
    category,
    startDate,
    endDate,
    severity,
    host,
    instance,
  } = eventsQuery

  const { isLoading: isEventsFilterLoading, getEventsFilter } =
    useEventsFilter()

  const eventsFilter = getEventsFilter(type)

  const {
    displayDates,
    onChange,
    onCancel,
    onReset: onDisplayDatesReset,
  } = useDatePickerDisplayDates({
    initialStartDate: startDate,
    initialEndDate: endDate,
  })

  const onDatePickerApply = () => {
    const { start, end } = displayDates
    if (!start || !end) return

    /**
     * When the user selects a start and end date from the date picker,
     * we need to set the `start` to the beginning of the `startDate` and the `end` to the end of the `endDate`.
     */
    onDatesChange({
      start: start.startOf('day'),
      end: end.endOf('day'),
    })
  }

  const onDatePickerReset = () => {
    onDisplayDatesReset()
    onDatesChange({
      start: undefined,
      end: undefined,
    })
  }

  const onAllFilterReset = () => {
    onKeywordChange('')
    onDatePickerReset()

    if (eventsFilter) {
      Object.keys(eventsFilter).map((key) => {
        const filterKey = mapFilterToFilterKey(key)

        if (filterKey) onFieldClear(filterKey)
      })
    }
  }

  const onTypeChange = (type: GetEventsTypeEnum) => {
    onTypeChangeProp(type)
    onAllFilterReset()
  }

  const showAllFilterReset = Object.values({
    keyword,
    start: startDate,
    stop: endDate,
    category,
    severity,
    host,
    instance,
  }).some((value) => !!value)

  return (
    <>
      <EventsContentSwitcher
        activeTab={type}
        onEventsTypeChange={onTypeChange}
      />
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <CosSearchBarFilter
            isLoading={isEventsFilterLoading}
            value={keyword}
            onChange={(e) => onKeywordChange(e.target.value)}
            onInputClear={() => onKeywordChange('')}
            showDropdown={false}
          />
        </div>
        {eventsFilter &&
          Object.entries(eventsFilter).map(([key, options]) => {
            const filterKey = mapFilterToFilterKey(key)
            if (!filterKey) return null

            return (
              <FilterDropdown
                key={key}
                isLoading={isEventsFilterLoading}
                filterKey={filterKey}
                options={options}
                selectedValue={eventsQuery[filterKey]}
                onFieldChange={onFieldChange}
                onFieldAllCheckChange={onFieldAllCheckChange}
                onFieldClear={onFieldClear}
              />
            )
          })}
        <CosDatePicker
          displayDates={displayDates}
          onChange={onChange}
          onCancel={onCancel}
          onApply={onDatePickerApply}
          onReset={onDatePickerReset}
        />
        {showAllFilterReset && (
          <>
            <div className="w-px self-stretch bg-functional-border-divider" />
            <CosIconFrame
              className="cursor-pointer"
              size="md"
              onClick={onAllFilterReset}
            >
              <XIcon className="icon-md-sm text-functional-text-light" />
            </CosIconFrame>
          </>
        )}
      </div>
    </>
  )
}
