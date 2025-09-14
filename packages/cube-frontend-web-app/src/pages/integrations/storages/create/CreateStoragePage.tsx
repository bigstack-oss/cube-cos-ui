import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { useCreateStorage } from './useCreateStorage'
import { ValidationLog } from '../_components/upsert/ValidationLog'
import { CosCollapsiblePanelLayout } from '@cube-frontend/ui-library'
import { useVendorModel } from './useVendorModel'

export const CreateStoragePage = () => {
  const { isLoading: isVendorModelsLoading, vendorModels } = useVendorModel()

  const {
    isValidating,
    isValidated,
    validationLog,
    validationLogPanel,
    validationErrorState,
    validate,
    clearValidationLog,
  } = useStorageValidation()

  const { isCreating, initialStorage, createStorage, cancel } =
    useCreateStorage(vendorModels)

  return (
    <UpsertStorageLayout title="Add Storage">
      <CosCollapsiblePanelLayout
        isControlledPanelOpen={validationLogPanel.isOpen}
        onControlledPanelOpenChange={validationLogPanel.toggle}
      >
        <CosCollapsiblePanelLayout.LeftPanel topic="Storage details">
          <StorageDetailsForm
            initialStorage={initialStorage}
            isVendorModelsLoading={isVendorModelsLoading}
            isSaving={isCreating}
            isValidating={isValidating}
            isValidated={isValidated}
            vendorModels={vendorModels}
            validationErrorState={validationErrorState}
            submitButtonText="Add storage to COS"
            clearValidationLog={clearValidationLog}
            onValidate={validate}
            onConfirm={createStorage}
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
