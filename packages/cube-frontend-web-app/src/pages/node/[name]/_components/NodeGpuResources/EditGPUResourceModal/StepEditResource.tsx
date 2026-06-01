import { ReactNode } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { GPUSupportResourceType } from '@cube-frontend/api'
import { MigBackedVgpuTable } from './tables/MigBackedVgpuTable'
import { SriovVgpuTable } from './tables/SriovVgpuTable'
import { UseProfileTable } from './useProfileTable'
import { resourceTypeLabelMap } from './editGPUResourceUtils'

type StepEditResourceProps = Pick<
  UseProfileTable,
  | 'editingResource'
  | 'selectedResourceType'
  | 'profileTable'
  | 'profileLimits'
  | 'profileFormSummary'
  | 'onResourceTypeChange'
  | 'onSriovVgpuProfileCheck'
  | 'onMigVgpuProfileCheck'
  | 'onSriovVgpuProfileCountsChange'
  | 'onMigVgpuProfileCountsChange'
>

export const StepEditResource = (props: StepEditResourceProps) => {
  const {
    editingResource,
    selectedResourceType,
    profileTable,
    profileLimits,
    profileFormSummary,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onMigVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCountsChange,
  } = props

  const { supportResourceTypes } = editingResource

  const profileTableMap: Record<
    GPUSupportResourceType | 'noResourceType',
    () => ReactNode
  > = {
    noResourceType: () => null,
    pgpu: () => null,
    sriovVgpu: () => (
      <SriovVgpuTable
        profiles={profileTable.sriovVgpu}
        profileCountLimit={profileLimits.count}
        profileCountCurrentSum={profileFormSummary.sriovVgpu.count}
        onProfileCheck={onSriovVgpuProfileCheck}
        onProfileCountsChange={onSriovVgpuProfileCountsChange}
      />
    ),
    migBackedVgpu: () => (
      <MigBackedVgpuTable
        profiles={profileTable.migBackedVgpu}
        vramMiBLimit={profileLimits.vramMiB}
        vramMiBCurrentSum={profileFormSummary.migBackedVgpu.vramMiB}
        profileCountLimit={profileLimits.count}
        profileCountCurrentSum={profileFormSummary.migBackedVgpu.count}
        onProfileCheck={onMigVgpuProfileCheck}
        onProfileCountsChange={onMigVgpuProfileCountsChange}
      />
    ),
  }

  const dropdownTriggerText = selectedResourceType
    ? resourceTypeLabelMap[selectedResourceType]
    : 'Error: Resource type not found'

  const renderContent =
    profileTableMap[selectedResourceType || 'noResourceType']

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="w-fit">
        <CosDropdown
          size="md"
          type="radio"
          variant="regular"
          label="GPU type"
          selectedItems={[selectedResourceType]}
          disabled={supportResourceTypes.length === 0}
        >
          <CosDropdown.Trigger>{dropdownTriggerText}</CosDropdown.Trigger>
          <CosDropdown.Menu>
            <CosDropdown.Item
              item="pgpu"
              onClick={() => onResourceTypeChange('pgpu')}
              disabled={!supportResourceTypes.includes('pgpu')}
            >
              {supportResourceTypes.includes('pgpu')
                ? resourceTypeLabelMap.pgpu
                : resourceTypeLabelMap.pgpu + '(Not supported)'}
            </CosDropdown.Item>
            <CosDropdown.Item
              item="sriovVgpu"
              onClick={() => onResourceTypeChange('sriovVgpu')}
              disabled={!supportResourceTypes.includes('sriovVgpu')}
            >
              {supportResourceTypes.includes('sriovVgpu')
                ? resourceTypeLabelMap.sriovVgpu
                : resourceTypeLabelMap.sriovVgpu + '(Not supported)'}
            </CosDropdown.Item>
            <CosDropdown.Item
              item="migBackedVgpu"
              onClick={() => onResourceTypeChange('migBackedVgpu')}
              disabled={!supportResourceTypes.includes('migBackedVgpu')}
            >
              {supportResourceTypes.includes('migBackedVgpu')
                ? resourceTypeLabelMap.migBackedVgpu
                : resourceTypeLabelMap.migBackedVgpu + '(Not supported)'}
            </CosDropdown.Item>
          </CosDropdown.Menu>
        </CosDropdown>
      </div>
      {renderContent()}
    </div>
  )
}
