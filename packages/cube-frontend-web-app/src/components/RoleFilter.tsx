import { CosDropdown } from '@cube-frontend/ui-library'
import { ChangeEvent, useState } from 'react'
import { Role, roles } from '../utils/role'

export type RoleFilterProps = {
  selectedRoles: Role[]
  handleRolesSelect: (roles: Role[]) => void
}

export const RoleFilter = (props: RoleFilterProps) => {
  const { selectedRoles, handleRolesSelect } = props

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

  const handleRoleClick = (role: Role) => {
    const selectedRoleSet = new Set(selectedRoles)

    if (selectedRoleSet.has(role)) {
      handleRolesSelect(selectedRoles.filter((sr) => sr !== role))
    } else {
      handleRolesSelect([...selectedRoles, role])
    }
  }

  return (
    <CosDropdown
      type="search-checkbox"
      variant="in-table"
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
            !role.toLowerCase().includes(searchValue.toLowerCase())
          ) {
            return null
          }
          return (
            <CosDropdown.Item
              key={role}
              item={role}
              onClick={() => handleRoleClick(role)}
            >
              {role}
            </CosDropdown.Item>
          )
        })}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
