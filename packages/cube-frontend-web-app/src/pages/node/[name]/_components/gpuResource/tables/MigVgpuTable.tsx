import {
  CosTableInput,
  GetCosBatchActionTable,
} from '@cube-frontend/ui-library'
import { ResourceProfile } from '../../mockResources'
import { ProfileTableRow } from '../editResourceUtils'
import { useMemo } from 'react'

type MigVgpuTableProps = {
  profiles: ProfileTableRow[]
  onProfileCheck: (rowId: string, checked: boolean) => void
  onProfileCountsChange: (rowId: string, counts: number) => void
}

const ProfileTable = GetCosBatchActionTable<ResourceProfile>()

export const MigVgpuTable = (props: MigVgpuTableProps) => {
  const { profiles, onProfileCheck, onProfileCountsChange } = props

  const selectedRowIds = useMemo(() => {
    return profiles
      .filter((profile) => profile.checked)
      .map((profile) => profile.id)
  }, [profiles])

  const handleProfileCountsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    rowId: string,
  ) => {
    const value = Number(e.target.value)
    if (isNaN(value)) return
    onProfileCountsChange(rowId, value)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <div className="primary-body3 flex font-semibold text-functional-title">
          Label
        </div>
        <div className="secondary-body3 text-functional-text-light">Hint</div>
      </div>
      <ProfileTable
        rows={profiles}
        selectedRowIds={selectedRowIds}
        onCheckChange={onProfileCheck}
        showHeaderCheckbox={false}
      >
        <ProfileTable.Column label="Profile/ID" property="name" />
        <ProfileTable.Column label="Counts" property="counts">
          {(counts, row) => (
            <CosTableInput
              value={counts}
              onChange={(e) => handleProfileCountsChange(e, row.id)}
            />
          )}
        </ProfileTable.Column>
        <ProfileTable.Column label="VRAM" property="vramMb" />
      </ProfileTable>
    </div>
  )
}
