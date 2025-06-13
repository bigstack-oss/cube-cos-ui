import { Dayjs } from 'dayjs'
import {
  CosDatePicker,
  CosIconFrame,
  CosSearchBarFilter,
  useDatePickerDisplayDates,
} from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import { GetNodesRolesEnum } from '@cube-frontend/api'

export type SupportFilesFiltersProps = {
  keyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  roles: GetNodesRolesEnum[]
  handleRolesSelect: (roles: GetNodesRolesEnum[]) => void
  startDate?: Dayjs
  endDate?: Dayjs
  handleStartDateChange: (date?: Dayjs) => void
  handleEndDateChange: (date?: Dayjs) => void
}

export const SupportFilesFilters = (props: SupportFilesFiltersProps) => {
  const {
    keyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    roles,
    handleRolesSelect,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
  } = props

  const {
    displayDates,
    onChange,
    onCancel,
    onReset: onDisplayDatesReset,
  } = useDatePickerDisplayDates({
    initialStartDate: startDate,
    initialEndDate: endDate,
  })

  const handleDatePickerApply = () => {
    const { start, end } = displayDates
    if (!start || !end) return

    /**
     * When the user selects a start and end date from the date picker,
     * we need to set the `start` to the beginning of the `startDate` and the `end` to the end of the `endDate`.
     */
    handleStartDateChange(start.startOf('day'))
    handleEndDateChange(end.endOf('day'))
  }

  const handleDatePickerReset = () => {
    onDisplayDatesReset()
    handleStartDateChange(undefined)
    handleEndDateChange(undefined)
  }

  const handleClearAllFilter = () => {
    handleRolesSelect([])
    handleSearchKeywordClear()
    handleDatePickerReset()
  }

  const showClearAllFilter =
    !!keyword || roles.length > 0 || !!startDate || !!endDate

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2">
        <CosSearchBarFilter
          className="w-[320px]"
          value={keyword}
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
          onInputClear={handleSearchKeywordClear}
          showDropdown={false}
        />
        <RoleFilter
          selectedRoles={roles}
          handleRolesSelect={handleRolesSelect}
        />
        <CosDatePicker
          displayDates={displayDates}
          onChange={onChange}
          onCancel={onCancel}
          onApply={handleDatePickerApply}
          onReset={handleDatePickerReset}
        />
      </div>
      {showClearAllFilter && (
        <>
          <div className="w-px self-stretch bg-functional-border-divider" />
          <CosIconFrame
            className="cursor-pointer"
            size="md"
            onClick={handleClearAllFilter}
          >
            <XIcon className="icon-md-sm text-functional-text-light" />
          </CosIconFrame>
        </>
      )}
    </div>
  )
}
