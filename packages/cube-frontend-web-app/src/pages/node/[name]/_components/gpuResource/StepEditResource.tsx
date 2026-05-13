import { ReactNode } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { GpuResourceTypeOption } from './editResourceUtils'
import { MigVgpuTable } from './tables/MigVgpuTable'
import { SriovVgpuTable } from './tables/SriovVgpuTable'
import { ProfileTable } from './useProfileTable'

const dropdownResourceTypeLabelMap: Record<GpuResourceTypeOption, string> = {
  passthrough: 'Passthrough',
  sriovVgpu: 'SR-IOV vGPU',
  migVgpu: 'MIG-backed vGPU',
}

type StepEditResourceProps = {
  profileTable: ProfileTable
  selectedResourceType: GpuResourceTypeOption
  onResourceTypeChange: (resourceType: GpuResourceTypeOption) => void
  onSriovVgpuProfileCheck: (rowId: string, checked: boolean) => void
  onMigVgpuProfileCheck: (rowId: string, checked: boolean) => void
  onSriovVgpuProfileCountsChange: (rowId: string, counts: number) => void
  onMigVgpuProfileCountsChange: (rowId: string, counts: number) => void
}

export const StepEditResource = (props: StepEditResourceProps) => {
  const {
    profileTable,
    selectedResourceType,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onMigVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCountsChange,
  } = props

  const profileTableMap: Record<GpuResourceTypeOption, () => ReactNode> = {
    passthrough: () => null,
    sriovVgpu: () => (
      <SriovVgpuTable
        profiles={profileTable.sriovVgpu}
        onProfileCheck={onSriovVgpuProfileCheck}
        onProfileCountsChange={onSriovVgpuProfileCountsChange}
      />
    ),
    migVgpu: () => (
      <MigVgpuTable
        profiles={profileTable.migVgpu}
        onProfileCheck={onMigVgpuProfileCheck}
        onProfileCountsChange={onMigVgpuProfileCountsChange}
      />
    ),
  }

  const renderContent = profileTableMap[selectedResourceType]

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="w-fit">
        <CosDropdown
          size="md"
          type="radio"
          variant="regular"
          isLoading={false}
          disabled={false}
          label="Resource Type"
          selectedItems={[selectedResourceType]}
        >
          <CosDropdown.Trigger>
            {dropdownResourceTypeLabelMap[selectedResourceType]}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            <CosDropdown.Item
              item="passthrough"
              onClick={() => onResourceTypeChange('passthrough')}
            >
              {dropdownResourceTypeLabelMap.passthrough}
            </CosDropdown.Item>
            <CosDropdown.Item
              item="sriovVgpu"
              onClick={() => onResourceTypeChange('sriovVgpu')}
            >
              {dropdownResourceTypeLabelMap.sriovVgpu}
            </CosDropdown.Item>
            <CosDropdown.Item
              item="migVgpu"
              onClick={() => onResourceTypeChange('migVgpu')}
            >
              {dropdownResourceTypeLabelMap.migVgpu}
            </CosDropdown.Item>
          </CosDropdown.Menu>
        </CosDropdown>
      </div>
      {renderContent()}
    </div>
  )
}
