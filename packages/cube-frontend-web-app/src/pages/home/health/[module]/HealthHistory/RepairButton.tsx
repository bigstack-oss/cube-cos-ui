import { CosButton } from '@cube-frontend/ui-library'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'

export type RepairButtonProps = {
  module: ModuleMetadata | undefined
  isRepairable: boolean
  isFixing: boolean
  onRepairClick: () => Promise<void>
}

export const RepairButton = (props: RepairButtonProps) => {
  const { module, isRepairable, isFixing, onRepairClick } = props

  if (!isRepairable) return null

  return (
    <CosButton loading={isFixing} disabled={!module} onClick={onRepairClick}>
      Repair
    </CosButton>
  )
}
