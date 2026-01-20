import { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { upperFirst } from 'lodash'
import { NodeRole } from '@cube-frontend/api'
import { CosDropdown } from '@cube-frontend/ui-library'
import { DataCenterContext } from '../context/DataCenterContext'

export type RoleFilterProps = {
  selectedRoles: NodeRole[]
  handleRolesSelect: (roles: NodeRole[]) => void
}

/**
 * This component has a dependency on the data center.
 * Do not use it outside of `<Content>`.
 */
export const RoleFilter = (props: RoleFilterProps) => {
  const { selectedRoles, handleRolesSelect } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const allRoles = dataCenter!.roles

  const onAllCheckChange = (checked: boolean) => {
    handleRolesSelect(checked ? allRoles : [])
  }

  const onClearSelection = () => {
    handleRolesSelect([])
  }

  const onRoleClick = (role: NodeRole): void => {
    const nextRoles = selectedRoles.includes(role)
      ? selectedRoles.filter((selectedRole) => selectedRole !== role)
      : [...selectedRoles, role]

    handleRolesSelect(nextRoles)
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
      <CosDropdown.Trigger placeholder={t('nodes.roles')}>
        {selectedRoles.length ? t('nodes.roles') : undefined}
      </CosDropdown.Trigger>
      <CosDropdown.Menu>
        {allRoles.map((role) => (
          <CosDropdown.Item
            key={role}
            item={role}
            onClick={() => onRoleClick(role)}
          >
            {upperFirst(t(`common.node.roles.${role}`))}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
