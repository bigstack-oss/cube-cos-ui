import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { NodeLicenseCurrentStatus, GetNodesRolesEnum } from '@cube-frontend/api'
import { NodeLicenseStatusFilter } from './NodeLicenseStatusFilter'

export type HostLicenseFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedRoles: GetNodesRolesEnum[]
  handleRolesSelect: (licenseTypes: GetNodesRolesEnum[]) => void
  selectedNodeLicenseStatuses: NodeLicenseCurrentStatus[]
  handleNodeLicenseStatusesSelect: (
    licenseStatuses: NodeLicenseCurrentStatus[],
  ) => void
}

export const HostLicenseFilters = (props: HostLicenseFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedRoles,
    handleRolesSelect,
    selectedNodeLicenseStatuses,
    handleNodeLicenseStatusesSelect,
  } = props

  const showClearAllFilter =
    !!searchKeyword ||
    selectedRoles.length > 0 ||
    selectedNodeLicenseStatuses.length > 0

  const handleClearRolesClick = () => {
    handleRolesSelect([])
  }

  const handleClearNodeLicenseStatusesClick = () => {
    handleNodeLicenseStatusesSelect([])
  }

  const handleClearAllFilter = () => {
    handleSearchKeywordClear()
    handleClearRolesClick()
    handleClearNodeLicenseStatusesClick()
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
        <NodeLicenseStatusFilter
          selectedNodeLicenseStatuses={selectedNodeLicenseStatuses}
          handleNodeLicenseStatusesSelect={handleNodeLicenseStatusesSelect}
          handleClearNodeLicenseStatusesClick={
            handleClearNodeLicenseStatusesClick
          }
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
