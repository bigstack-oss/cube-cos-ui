import { useContext } from 'react'
import { GetDataCentersResponseDataInnerRolesEnum } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'

export type RoleFilterProps = {
  selectedRoles: GetDataCentersResponseDataInnerRolesEnum[]
  handleRolesSelect: (roles: GetDataCentersResponseDataInnerRolesEnum[]) => void
}

/**
 * This component has a dependency on the data center.
 * Do not use it outside of `<Content>`.
 */
export const RoleFilter = (props: RoleFilterProps) => {
  const { selectedRoles, handleRolesSelect } = props

  const { dataCenter } = useContext(DataCenterContext)

  const allRoles = dataCenter!.roles

  const handleAllSelect = (checked: boolean) => {
    if (checked) {
      handleRolesSelect(allRoles)
    } else {
      handleRolesSelect([])
    }
  }

  const handleClearRolesClick = () => {
    handleRolesSelect([])
  }

  const handleRoleClick = (role: GetDataCentersResponseDataInnerRolesEnum) => {
    const selectedRoleSet = new Set(selectedRoles)

    if (selectedRoleSet.has(role)) {
      handleRolesSelect(selectedRoles.filter((sr) => sr !== role))
    } else {
      handleRolesSelect([...selectedRoles, role])
    }
  }

  return (
    <CosDropdown
      size="sm"
      type="checkbox"
      variant="withFilter"
      selectedItems={selectedRoles}
      onAllCheckChange={handleAllSelect}
      onClearSelection={handleClearRolesClick}
    >
      <CosDropdown.Trigger placeholder="Roles">
        {selectedRoles.length > 0 ? `Roles` : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {allRoles.map((role) => (
          <CosDropdown.Item
            key={role}
            item={role}
            onClick={() => handleRoleClick(role)}
          >
            {role}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
