import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import { Role } from '@cube-frontend/web-app/utils/role'
import { LicenseStatus, StatusFilter } from '../LicenseFilters/StatusFilter'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'

export type HostLicenseFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedRoles: Role[]
  handleRolesSelect: (licenseTypes: Role[]) => void
  selectedLicenseStatuses: LicenseStatus[]
  handleLicenseStatusesSelect: (licenseStatuses: LicenseStatus[]) => void
}

export const HostLicenseFilters = (props: HostLicenseFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedRoles,
    handleRolesSelect,
    selectedLicenseStatuses,
    handleLicenseStatusesSelect,
  } = props

  const showClearAllFilter =
    !!searchKeyword ||
    selectedRoles.length > 0 ||
    selectedLicenseStatuses.length > 0

  const handleClearRolesClick = () => {
    handleRolesSelect([])
  }

  const handleClearLicenseStatusesClick = () => {
    handleLicenseStatusesSelect([])
  }

  const handleClearAllFilter = () => {
    handleSearchKeywordClear()
    handleClearRolesClick()
    handleClearLicenseStatusesClick()
  }

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
        <StatusFilter
          selectedLicenseStatuses={selectedLicenseStatuses}
          handleLicenseStatusesSelect={handleLicenseStatusesSelect}
          handleClearLicenseStatusesClick={handleClearLicenseStatusesClick}
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
