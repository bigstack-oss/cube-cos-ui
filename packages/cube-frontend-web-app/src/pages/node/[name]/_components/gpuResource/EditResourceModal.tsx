import { useMemo, useState } from 'react'
import { CosModal } from '@cube-frontend/ui-library'
import { ResourceRow } from '../NodeResources'
import { StepConfirmResource } from './StepConfirmResource'
import { StepEditResource } from './StepEditResource'
import { GpuResourceStep } from './editResourceUtils'
import { useProfileTable } from './useProfileTable'

export type EditResourceModalProps = {
  isModalOpen: boolean
  resource: ResourceRow | undefined
  onClose: () => void
}

export const EditResourceModal = (props: EditResourceModalProps) => {
  const { isModalOpen, resource, onClose } = props

  const {
    selectedResourceType,
    profileTable,
    onResourceTypeChange,
    onSriovVgpuProfileCheck,
    onSriovVgpuProfileCountsChange,
    onMigVgpuProfileCheck,
    onMigVgpuProfileCountsChange,
    resetProfileForm,
    getConfirmTableData,
    getPayload,
  } = useProfileTable(resource)

  const [step, setStep] = useState<GpuResourceStep>('edit')

  const isEditStep = step === 'edit'
  const isConfirmStep = step === 'confirm'
  const isPassthrough = selectedResourceType === 'passthrough'

  const isNextStepDisabled = useMemo(() => {
    if (isEditStep && !isPassthrough) {
      return !profileTable[selectedResourceType].some(
        (profile) => profile.checked && profile.counts > 0,
      )
    }
    return false
  }, [isEditStep, isPassthrough, profileTable, selectedResourceType])

  const getActionText = () => {
    if (isEditStep && !isPassthrough) {
      return 'Next'
    } else {
      return 'Confirm'
    }
  }

  const onActionClick = () => {
    if (isEditStep && !isPassthrough) {
      setStep('confirm')
    } else {
      // TODO: Submit
      const payload = getPayload()
      console.log(payload)
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

  const confirmTableData = getConfirmTableData()

  return (
    <CosModal
      size="sm"
      title="Edit Resource Type"
      isOpen={isModalOpen}
      actionText={getActionText()}
      actionButtonProps={{ disabled: isNextStepDisabled }}
      onCloseClick={onCloseClick}
      onActionClick={onActionClick}
    >
      {isEditStep && (
        <StepEditResource
          profileTable={profileTable}
          selectedResourceType={selectedResourceType}
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
