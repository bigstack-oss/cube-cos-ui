import { useMemo } from 'react'
import {
  CosTableInput,
  GetCosBatchActionTable,
} from '@cube-frontend/ui-library'
import { toReadableSizeString } from '@cube-frontend/web-app/utils/byte'
import { ProfileTableRow } from '../editGPUResourceUtils'
import { ProfileTableLimitHint } from './ProfileTableLimitHint'

type SriovVgpuTableProps = {
  profiles: ProfileTableRow[]
  profileCountLimit: number
  profileCountCurrentSum: number
  onProfileCheck: (rowId: string, checked: boolean) => void
  onProfileCountsChange: (rowId: string, counts: number) => void
}

const ProfileTable = GetCosBatchActionTable<ProfileTableRow>()

export const SriovVgpuTable = (props: SriovVgpuTableProps) => {
  const {
    profiles,
    profileCountLimit,
    profileCountCurrentSum,
    onProfileCheck,
    onProfileCountsChange,
  } = props

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

  const onAllProfileCheck = (checked: boolean) => {
    profiles.forEach((profile) => {
      onProfileCheck(profile.id, checked)
    })
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <div className="primary-body3 flex font-semibold text-functional-title">
          Select profiles/ID for GPU
        </div>
        <ProfileTableLimitHint
          label="Counts limit"
          limit={{ value: profileCountLimit }}
          currentSum={{ value: profileCountCurrentSum }}
        />
      </div>
      <ProfileTable
        rows={profiles}
        selectedRowIds={selectedRowIds}
        showHeaderCheckbox={true}
        onCheckChange={onProfileCheck}
        onAllCheckChange={onAllProfileCheck}
      >
        <ProfileTable.Column label="Profile/ID" property="name" />
        <ProfileTable.Column label="Counts" property="count">
          {(counts, row) => (
            <CosTableInput
              className="max-w-[59px]"
              value={counts}
              onChange={(e) => handleProfileCountsChange(e, row.id)}
            />
          )}
        </ProfileTable.Column>
        <ProfileTable.Column label="VRAM" property="vramMiB">
          {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
        </ProfileTable.Column>
      </ProfileTable>
    </div>
  )
}
