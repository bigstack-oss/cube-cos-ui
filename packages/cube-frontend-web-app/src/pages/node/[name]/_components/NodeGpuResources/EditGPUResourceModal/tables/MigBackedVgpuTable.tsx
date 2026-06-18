import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import {
  CosTableInput,
  GetCosBatchActionTable,
} from '@cube-frontend/ui-library'
import {
  toReadableSizeString,
  toReadableUsedSize,
} from '@cube-frontend/web-app/utils/byte'
import { ProfileTableRow } from '../editGPUResourceUtils'
import { ProfileTableLimitHint } from './ProfileTableLimitHint'

type MigBackedVgpuTableProps = {
  profiles: ProfileTableRow[]
  vramMiBLimit: number
  vramMiBCurrentSum: number
  onProfileCheck: (rowId: string, checked: boolean) => void
  onProfileCountsChange: (rowId: string, counts: number) => void
}

const ProfileTable = GetCosBatchActionTable<ProfileTableRow>()

export const MigBackedVgpuTable = (props: MigBackedVgpuTableProps) => {
  const {
    profiles,
    vramMiBLimit: originalVramMiBLimit,
    vramMiBCurrentSum: originalVramMiBCurrentSum,
    onProfileCheck,
    onProfileCountsChange,
  } = props

  const { t } = useTranslation()

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

  const {
    total: vramMiBLimit,
    used: vramMiBCurrentSum,
    sizeUnit: vramMiBSizeUnit,
  } = toReadableUsedSize({
    total: originalVramMiBLimit,
    used: originalVramMiBCurrentSum,
    originalSizeUnit: 'MiB',
  })

  const onAllProfileCheck = (checked: boolean) => {
    profiles.forEach((profile) => {
      onProfileCheck(profile.id, checked)
    })
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <div className="primary-body3 font-semibold text-functional-title">
          {t('nodes.details.editGpuType.selectProfilesId')}
        </div>
        <div className="flex items-center gap-x-3">
          <ProfileTableLimitHint
            label={t('nodes.details.editGpuType.gpuTotal')}
            limit={{ value: vramMiBLimit, unit: vramMiBSizeUnit }}
            currentSum={{ value: vramMiBCurrentSum, unit: vramMiBSizeUnit }}
          />
        </div>
      </div>
      <ProfileTable
        rows={profiles}
        selectedRowIds={selectedRowIds}
        showHeaderCheckbox={true}
        onCheckChange={onProfileCheck}
        onAllCheckChange={onAllProfileCheck}
      >
        <ProfileTable.Column
          label={t('nodes.details.profilesIdList.title')}
          property="name"
        />
        <ProfileTable.Column
          label={t('nodes.details.profilesIdList.counts')}
          property="count"
        >
          {(counts, row) => {
            const countLimit = row.countLimit ?? Number.POSITIVE_INFINITY
            const isCountsValid = row.checked ? counts <= countLimit : true

            return (
              <CosTableInput
                className="max-w-[59px]"
                value={counts}
                onChange={(e) => handleProfileCountsChange(e, row.id)}
                hideErrorIcon={true}
                // Note: the error message is not translated because the error icon is hidden in the UI.
                errorMessage={isCountsValid ? undefined : 'Wrong value'}
              />
            )
          }}
        </ProfileTable.Column>
        <ProfileTable.Column
          label={t('nodes.details.editGpuType.maxCount')}
          property="countLimit"
        />
        <ProfileTable.Column
          label={t('nodes.details.profilesIdList.vram')}
          property="vramMiB"
        >
          {(vramMiB) => toReadableSizeString(vramMiB, 'MiB')}
        </ProfileTable.Column>
      </ProfileTable>
    </div>
  )
}
