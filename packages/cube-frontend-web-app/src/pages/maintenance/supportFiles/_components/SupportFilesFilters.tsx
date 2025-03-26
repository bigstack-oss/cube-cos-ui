import { Dayjs } from 'dayjs'
import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import { DatePickerFilter } from './DatePickerFilter'
import { GetNodesRoleEnum } from '@cube-frontend/api'

export type SupportFilesFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedRoles: GetNodesRoleEnum[]
  handleRolesSelect: (roles: GetNodesRoleEnum[]) => void
  startDate?: Dayjs
  endDate?: Dayjs
  handleStartDateChange: (date?: Dayjs) => void
  handleEndDateChange: (date?: Dayjs) => void
}

export const SupportFilesFilters = (props: SupportFilesFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedRoles,
    handleRolesSelect,
    startDate,
    endDate,
    handleStartDateChange,
    handleEndDateChange,
  } = props

  const handleClearAllFilter = () => {
    handleRolesSelect([])
    handleSearchKeywordClear()
    handleStartDateChange(undefined)
    handleEndDateChange(undefined)
  }

  const showClearAllFilter =
    !!searchKeyword || selectedRoles.length > 0 || !!startDate || !!endDate

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2">
        <CosSearchBarFilter
          className="w-[320px]"
          value={searchKeyword}
          onChange={(e) => handleSearchKeywordChange(e.target.value)}
          onInputClear={handleSearchKeywordClear}
          placeholder="Search"
          showDropdown={false}
        />
        <RoleFilter
          selectedRoles={selectedRoles}
          handleRolesSelect={handleRolesSelect}
        />
        <DatePickerFilter
          startDate={startDate}
          endDate={endDate}
          handleStartDateChange={handleStartDateChange}
          handleEndDateChange={handleEndDateChange}
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
