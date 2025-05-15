import { GetDataCentersResponseDataInnerRolesEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { upperFirst } from 'lodash'
import { ChangeEvent, useContext, useMemo, useState } from 'react'

type RoleDropdownProps = {
  selectedRoles: GetDataCentersResponseDataInnerRolesEnum[]
  onChange: (roles: GetDataCentersResponseDataInnerRolesEnum[]) => void
}

export const RoleDropdown = (props: RoleDropdownProps) => {
  const { selectedRoles, onChange } = props

  const { dataCenter } = useContext(DataCenterContext)

  const roles = dataCenter!.roles

  const [search, setSearch] = useState('')

  const matchedRoles = useMemo<
    GetDataCentersResponseDataInnerRolesEnum[]
  >(() => {
    const loweredSearch = search.toLowerCase()
    if (!loweredSearch) {
      return roles
    }
    return roles.filter((role) => role.toLowerCase().includes(loweredSearch))
  }, [search, roles])

  const onAllCheckChange = (checked: boolean) => {
    onChange(checked ? roles : [])
  }

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target
    setSearch(value)
  }

  const onClearClick = (): void => {
    onChange([])
  }

  const onRoleClick = (
    role: GetDataCentersResponseDataInnerRolesEnum,
  ): void => {
    const nextRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((selectedRole) => selectedRole !== role)
      : [...selectedRoles, role]
    onChange(nextRoles)
  }

  return (
    <CosDropdown
      type="search-checkbox"
      variant="in-table"
      selectedItems={selectedRoles}
      onAllCheckChange={onAllCheckChange}
      searchValue={search}
      onSearchChange={onSearchChange}
      onClearClick={onClearClick}
    >
      <CosDropdown.Trigger placeholder="Roles">
        {selectedRoles.length ? 'Roles' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {matchedRoles.map((role) => (
          <CosDropdown.Item
            key={role}
            item={role}
            onClick={() => onRoleClick(role)}
          >
            {upperFirst(role)}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
