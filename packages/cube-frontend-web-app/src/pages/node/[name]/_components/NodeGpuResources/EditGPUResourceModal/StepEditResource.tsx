import { ReactNode } from 'react'
import { CosDropdown } from '@cube-frontend/ui-library'
import { GPUSupportResourceType } from '@cube-frontend/api'
import { MigBackedVgpuTable } from './tables/MigBackedVgpuTable'
import { SriovVgpuTable } from './tables/SriovVgpuTable'
import { UseProfileTable } from './useProfileTable'
import { GpuTypeLabelKeyMap } from '../utils'
import { useTranslation } from 'react-i18next'

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

  const { t } = useTranslation()

  const gpuTypeOptions: GPUSupportResourceType[] = [
    GPUSupportResourceType.Pgpu,
    GPUSupportResourceType.SriovVgpu,
    GPUSupportResourceType.MigBackedVgpu,
  ]

  const renderDropdownItem = (type: GPUSupportResourceType) => {
    const isSupported = supportResourceTypes.includes(type)
    const label = t(GpuTypeLabelKeyMap[type])

    return (
      <CosDropdown.Item
        key={type}
        item={type}
        onClick={() => onResourceTypeChange(type)}
        disabled={!isSupported}
      >
        {isSupported
          ? label
          : `${label} (${t('nodes.details.editGpuType.notSupported')})`}
      </CosDropdown.Item>
    )
  }

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
        onProfileCheck={onMigVgpuProfileCheck}
        onProfileCountsChange={onMigVgpuProfileCountsChange}
      />
    ),
  }

  const dropdownTriggerText = selectedResourceType
    ? t(GpuTypeLabelKeyMap[selectedResourceType])
    : t('nodes.details.editGpuType.gpuType.notFound')

  const renderContent =
    profileTableMap[selectedResourceType || 'noResourceType']

  return (
    <div className="flex w-full flex-col gap-y-5">
      <div className="w-fit">
        <CosDropdown
          size="md"
          type="radio"
          variant="regular"
          label={t('nodes.details.editGpuType.gpuType')}
          selectedItems={[selectedResourceType]}
          disabled={supportResourceTypes.length === 0}
        >
          <CosDropdown.Trigger>{dropdownTriggerText}</CosDropdown.Trigger>
          <CosDropdown.Menu>
            {gpuTypeOptions.map(renderDropdownItem)}
          </CosDropdown.Menu>
        </CosDropdown>
      </div>
      {renderContent()}
    </div>
  )
}
