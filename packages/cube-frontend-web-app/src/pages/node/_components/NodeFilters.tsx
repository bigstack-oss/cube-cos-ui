import { CosIconFrame, CosSearchBarFilter } from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import { RoleFilter } from '@cube-frontend/web-app/components/RoleFilter'
import { GetNodesRolesEnum } from '@cube-frontend/api'

export type NodeFiltersProps = {
  keyword: string
  handleKeywordChange: (value: string) => void
  handleKeywordClear: () => void
  roles: GetNodesRolesEnum[]
  handleRolesSelect: (roles: GetNodesRolesEnum[]) => void
}

export const NodeFilters = (props: NodeFiltersProps) => {
  const {
    keyword,
    handleKeywordChange,
    handleKeywordClear,
    roles,
    handleRolesSelect,
  } = props

  const handleClearAllFilter = () => {
    handleRolesSelect([])
    handleKeywordClear()
  }

  const showClearAllFilter = !!keyword || roles.length > 0

  return (
    <div className="flex items-center gap-x-3">
      <div className="flex items-center gap-x-2">
        <CosSearchBarFilter
          className="w-[320px]"
          value={keyword}
          onChange={(e) => handleKeywordChange(e.target.value)}
          onInputClear={handleKeywordClear}
          placeholder="Search"
          showDropdown={false}
        />
        <RoleFilter
          selectedRoles={roles}
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
