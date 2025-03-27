import { CosDropdown } from '@cube-frontend/ui-library'
import { NodeRoleEnum, nodeRoles } from '@cube-frontend/web-app/utils/node'
import { capitalize } from 'lodash'
import { ChangeEvent, useMemo, useState } from 'react'

type RoleDropdownProps = {
  selectedRoles: NodeRoleEnum[]
  onChange: (roles: NodeRoleEnum[]) => void
}

export const RoleDropdown = (props: RoleDropdownProps) => {
  const { selectedRoles, onChange } = props

  const [search, setSearch] = useState('')

  const matchedRoles = useMemo<NodeRoleEnum[]>(() => {
    const loweredSearch = search.toLowerCase()
    if (!loweredSearch) {
      return nodeRoles
    }
    return nodeRoles.filter((role) =>
      role.toLowerCase().includes(loweredSearch),
    )
  }, [search])

  const onAllCheckChange = (checked: boolean) => {
    onChange(checked ? nodeRoles : [])
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSearch(value)
  }

  const onClearClick = (): void => {
    onChange([])
  }

  const onRoleClick = (role: NodeRoleEnum): void => {
    const nextRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((selectedRole) => selectedRole !== role)
      : [...selectedRoles, role]
    onChange(nextRoles)
  }

  return (
    <CosDropdown
      type="search-checkbox"
      selectedItems={selectedRoles}
      onAllCheckChange={onAllCheckChange}
      searchValue={search}
      onSearchChange={onSearchChange}
      onClearClick={onClearClick}
    >
      <CosDropdown.Trigger placeholder="Role">
        {selectedRoles.length ? 'Roles' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {matchedRoles.map((role) => (
          <CosDropdown.Item
            key={role}
            item={role}
            onClick={() => onRoleClick(role)}
          >
            {capitalize(role)}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
