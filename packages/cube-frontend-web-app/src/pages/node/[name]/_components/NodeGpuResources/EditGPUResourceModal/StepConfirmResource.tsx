import { useTranslation } from 'react-i18next'
import ChevronLeft from '@cube-frontend/ui-library/icons/monochrome/chevron_left.svg?react'
import { GPUSupportResourceType } from '@cube-frontend/api'
import { CosButton, CosInlineNotification } from '@cube-frontend/ui-library'
import { ConfirmTable } from './tables/ConfirmTable'
import { ConfirmTableData } from './editGPUResourceUtils'

export type StepConfirmResourceProps = {
  confirmTableData: ConfirmTableData
  onGoBackToEditClick: () => void
}

export const StepConfirmResource = (props: StepConfirmResourceProps) => {
  const { confirmTableData, onGoBackToEditClick } = props

  const { t } = useTranslation()

  if (!confirmTableData) return null

  return (
    <div className="flex flex-col items-start gap-y-5">
      <div className="primary-body2 text-functional-text">
        {t('nodes.details.editGpuType.confirmDescription1')}
        <br />
        {t('nodes.details.editGpuType.confirmDescription2')}
      </div>
      {/*
        The SR-IOV vGPU check only counts VFs. NVIDIA reserves extra VRAM per
        vGPU, so a combination that passes can still fail to apply.
      */}
      {confirmTableData.resourceType === GPUSupportResourceType.SriovVgpu && (
        <CosInlineNotification type="warning" isClosable={false}>
          {t('nodes.details.editGpuType.sriovVgpuCapacityWarning')}
        </CosInlineNotification>
      )}
      <ConfirmTable confirmTableData={confirmTableData} />
      <CosButton
        type="ghost"
        size="md"
        usage="icon-left"
        Icon={ChevronLeft}
        onClick={onGoBackToEditClick}
      >
        {t('nodes.details.editGpuType.backToEdit')}
      </CosButton>
    </div>
  )
}
