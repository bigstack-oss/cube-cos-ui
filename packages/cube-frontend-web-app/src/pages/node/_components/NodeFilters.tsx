import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import { GetNodesRolesEnum } from '@cube-frontend/api'

export type NodeFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedRoles: GetNodesRolesEnum[]
  handleRolesSelect: (roles: GetNodesRolesEnum[]) => void
}

export const NodeFilters = (props: NodeFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedRoles,
    handleRolesSelect,
  } = props

  const handleClearAllFilter = () => {
    handleRolesSelect([])
    handleSearchKeywordClear()
  }

  const showClearAllFilter = !!searchKeyword || selectedRoles.length > 0

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
