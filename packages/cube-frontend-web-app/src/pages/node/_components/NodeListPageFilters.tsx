import { ChangeEvent, useState } from 'react'
import {
  CosButton,
  CosDropdown,
  CosIconFrame,
  CosSearchBarFilter,
} from '@cube-frontend/ui-library'
import XIcon from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'

export type RoleItem = {
  name: string
}

// TODO: extract roles enum to the openAPI docs.
const roles = [
  { name: 'Control-converged' },
  { name: 'Control' },
  { name: 'Compute' },
  { name: 'Storage' },
  { name: 'Edge-core' },
  { name: 'Moderator' },
] satisfies RoleItem[]

export type NodeListPageFiltersProps = {
  searchKeyword: string
  handleSearchKeywordChange: (value: string) => void
  handleSearchKeywordClear: () => void
  selectedRoles: RoleItem[]
  handleRolesSelect: (roles: RoleItem[]) => void
}

export const NodeListPageFilters = (props: NodeListPageFiltersProps) => {
  const {
    searchKeyword,
    handleSearchKeywordChange,
    handleSearchKeywordClear,
    selectedRoles,
    handleRolesSelect,
  } = props

  const [searchValue, setSearchValue] = useState('')

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }

  const handleAllSelect = (checked: boolean) => {
    if (checked) {
      handleRolesSelect(roles)
    } else {
      handleRolesSelect([])
    }
  }

  const handleClearRolesClick = () => {
    handleRolesSelect([])
  }

  const handleRoleClick = (role: RoleItem) => {
    const roleSet = new Set(selectedRoles.map((f) => f.name))

    if (roleSet.has(role.name)) {
      handleRolesSelect(selectedRoles.filter((f) => f.name !== role.name))
    } else {
      handleRolesSelect([...selectedRoles, role])
    }
  }

  const handleCreateSupportFiles = () => {
    // TODO
  }

  const handleClearAllFilter = () => {
    handleClearRolesClick()
    handleSearchKeywordClear()
  }

  const showClearAllFilter = !!searchKeyword || selectedRoles.length > 0

  return (
    <div className="flex items-center justify-between">
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
          <CosDropdown
            type="search-checkbox"
            variant="default"
            selectedItems={selectedRoles}
            searchValue={searchValue}
            onSearchChange={handleSearchChange}
            onAllCheckChange={handleAllSelect}
            onClearClick={handleClearRolesClick}
          >
            <CosDropdown.Trigger placeholder="Select a Role">
              {selectedRoles.length > 0 ? `Roles` : undefined}
            </CosDropdown.Trigger>
            <CosDropdown.Menu>
              {roles.map((role) => {
                if (
                  searchValue &&
                  !role.name.toLowerCase().includes(searchValue.toLowerCase())
                ) {
                  return null
                }
                return (
                  <CosDropdown.Item
                    key={role.name}
                    item={role}
                    onClick={() => handleRoleClick(role)}
                  >
                    {role.name}
                  </CosDropdown.Item>
                )
              })}
            </CosDropdown.Menu>
          </CosDropdown>
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
      <CosButton onClick={handleCreateSupportFiles}>
        Create support files
      </CosButton>
    </div>
  )
}
