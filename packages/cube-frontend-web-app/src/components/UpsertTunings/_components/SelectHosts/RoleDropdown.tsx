import { GetDataCentersResponseDataInnerRolesEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { upperFirst } from 'lodash'
import { useContext } from 'react'

type RoleDropdownProps = {
  selectedRoles: GetDataCentersResponseDataInnerRolesEnum[]
  onChange: (roles: GetDataCentersResponseDataInnerRolesEnum[]) => void
}

export const RoleDropdown = (props: RoleDropdownProps) => {
  const { selectedRoles, onChange } = props

  const { dataCenter } = useContext(DataCenterContext)

  const roles = dataCenter!.roles

  const onAllCheckChange = (checked: boolean) => {
    onChange(checked ? roles : [])
  }

  const onClearSelection = (): void => {
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
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedRoles}
      onAllCheckChange={onAllCheckChange}
      onClearSelection={onClearSelection}
    >
      <CosDropdown.Trigger placeholder="Roles">
        {selectedRoles.length ? 'Roles' : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {roles.map((role) => (
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
