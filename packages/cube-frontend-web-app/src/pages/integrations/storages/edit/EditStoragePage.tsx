import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { useStorageVendors } from '../_components/useStorageVendors'
import { useEditStorage } from './useEditStorage'
import { ValidationLog } from '../_components/upsert/ValidationLog'
import { CosCollapsiblePanelLayout } from '@cube-frontend/ui-library'

export const EditStoragePage = () => {
  const { isLoading: isVendorsLoading, data: vendors } = useStorageVendors()

  const {
    isValidating,
    isValidated,
    validationLog,
    validationLogPanel,
    validationErrorState,
    validate,
    clearValidationLog,
  } = useStorageValidation()

  const {
    initialStorage,
    isLoading: isStorageLoading,
    isUpdating,
    updateStorage,
    cancel,
  } = useEditStorage()

  return (
    <UpsertStorageLayout title="Edit Storage">
      <CosCollapsiblePanelLayout
        isControlledPanelOpen={validationLogPanel.isOpen}
        onControlledPanelOpenChange={validationLogPanel.toggle}
      >
        <CosCollapsiblePanelLayout.LeftPanel topic="Storage details">
          <StorageDetailsForm
            isEdit={true}
            initialStorage={initialStorage}
            isInitialStorageLoading={isStorageLoading}
            isVendorModelsLoading={isVendorsLoading}
            isSaving={isUpdating}
            isValidating={isValidating}
            isValidated={isValidated}
            vendorModels={vendors}
            validationErrorState={validationErrorState}
            submitButtonText="Update"
            clearValidationLog={clearValidationLog}
            onValidate={validate}
            onConfirm={updateStorage}
            onCancel={cancel}
          />
        </CosCollapsiblePanelLayout.LeftPanel>
        <CosCollapsiblePanelLayout.RightPanel topic="Validate Information">
          <ValidationLog log={validationLog} />
        </CosCollapsiblePanelLayout.RightPanel>
      </CosCollapsiblePanelLayout>
    </UpsertStorageLayout>
  )
}
