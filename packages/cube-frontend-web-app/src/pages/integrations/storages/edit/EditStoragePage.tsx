import { CollapsiblePanelLayout } from '@cube-frontend/web-app/components/CollapsiblePanelLayout/CollapsiblePanelLayout'
import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { useStorageVendors } from '../_components/useStorageVendors'
import { useEditStorage } from './useEditStorage'
import { ValidationLog } from '../_components/upsert/ValidationLog'

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
      <CollapsiblePanelLayout
        isControlledPanelOpen={validationLogPanel.isOpen}
        onControlledPanelOpenChange={validationLogPanel.toggle}
      >
        <CollapsiblePanelLayout.LeftPanel topic="Storage details">
          <StorageDetailsForm
            isEdit={true}
            initialStorage={initialStorage}
            isInitialStorageLoading={isStorageLoading}
            isVendorsLoading={isVendorsLoading}
            isSaving={isUpdating}
            isValidating={isValidating}
            isValidated={isValidated}
            vendors={vendors}
            validationErrorState={validationErrorState}
            submitButtonText="Update"
            clearValidationLog={clearValidationLog}
            onValidate={validate}
            onConfirm={updateStorage}
            onCancel={cancel}
          />
        </CollapsiblePanelLayout.LeftPanel>
        <CollapsiblePanelLayout.RightPanel topic="Validate Information">
          <ValidationLog log={validationLog} />
        </CollapsiblePanelLayout.RightPanel>
      </CollapsiblePanelLayout>
    </UpsertStorageLayout>
  )
}
