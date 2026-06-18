import { useContext, useState } from 'react'
import { CosModal } from '@cube-frontend/ui-library'
import { ListNodeGPUCardsResponseDataInner } from '@cube-frontend/api'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { StepConfirmResource } from './StepConfirmResource'
import { StepEditResource } from './StepEditResource'
import { getPayload, GpuResourceStep } from './editGPUResourceUtils'
import { useProfileTable } from './useProfileTable'
import { useTranslation } from 'react-i18next'

export type EditGPUResourceModalProps = {
  isModalOpen: boolean
  nodeName: string | undefined
  resource: ListNodeGPUCardsResponseDataInner
  onClose: () => void
}

export const EditGPUResourceModal = (props: EditGPUResourceModalProps) => {
  const { isModalOpen, nodeName, resource, onClose } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const {
    editingResource,
    selectedResourceType,
    profileTable,
    profileLimits,
    profileFormSummary,
    isActionButtonDisabled,
    confirmTableData,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCheck,
    onMigVgpuProfileCountsChange,
    resetProfileForm,
  } = useProfileTable(resource)

  const { isLoading: isUpdating, mutateResource: updateNodeGPUCard } =
    useCosMutationRequest(nodesApi.updateNodeGPUCard)

  const [step, setStep] = useState<GpuResourceStep>('edit')

  const isEditStep = step === 'edit'
  const isConfirmStep = step === 'confirm'

  const getActionText = () => {
    if (isEditStep) {
      return t('nodes.details.editGpuType.next')
    } else {
      return t('nodes.details.editGpuType.confirm')
    }
  }

  const onGoBackToEditClick = () => {
    setStep('edit')
  }

  const onCloseClick = () => {
    setStep('edit')
    resetProfileForm()
    onClose()
  }

  const onActionClick = async () => {
    if (isEditStep) {
      setStep('confirm')
    } else {
      if (!nodeName) return

      const payload = getPayload({
        selectedResourceType,
        confirmTableData,
      })

      if (!payload) return

      try {
        await updateNodeGPUCard({
          dataCenter: dataCenter!.name,
          nodeName,
          gpuId: editingResource.id,
          updateNodeGPUCardPutRequest: payload,
        })
        onCloseClick()
      } catch (error) {
        console.error('Update node GPU card error: ', error)
      }
    }
  }

  return (
    <CosModal
      size="sm"
      title={`${t('nodes.details.editGpuType')}: ${editingResource.name}`}
      isOpen={isModalOpen}
      actionText={getActionText()}
      actionButtonProps={{
        loading: isUpdating,
        disabled: isActionButtonDisabled,
      }}
      cancelButtonProps={{
        disabled: isUpdating,
      }}
      onCloseClick={onCloseClick}
      onActionClick={onActionClick}
    >
      {isEditStep && (
        <StepEditResource
          editingResource={editingResource}
          selectedResourceType={selectedResourceType}
          profileTable={profileTable}
          profileLimits={profileLimits}
          profileFormSummary={profileFormSummary}
          onResourceTypeChange={onResourceTypeChange}
          onSriovVgpuProfileCheck={onSriovVgpuProfileCheck}
          onMigVgpuProfileCheck={onMigVgpuProfileCheck}
          onSriovVgpuProfileCountsChange={onSriovVgpuProfileCountsChange}
          onMigVgpuProfileCountsChange={onMigVgpuProfileCountsChange}
        />
      )}
      {isConfirmStep && confirmTableData && (
        <StepConfirmResource
          confirmTableData={confirmTableData}
          onGoBackToEditClick={onGoBackToEditClick}
        />
      )}
    </CosModal>
  )
}
