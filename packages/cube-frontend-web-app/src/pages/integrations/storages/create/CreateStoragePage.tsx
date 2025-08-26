import { CollapsiblePanelLayout } from '@cube-frontend/web-app/components/CollapsiblePanelLayout/CollapsiblePanelLayout'
import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { useStorageVendors } from '../_components/useStorageVendors'
import { useCreateStorage } from './useCreateStorage'
import { ValidationLog } from '../_components/upsert/ValidationLog'

export const CreateStoragePage = () => {
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

  const { isCreating, initialStorage, createStorage, cancel } =
    useCreateStorage(vendors)

  return (
    <UpsertStorageLayout title="Add Storage">
      <CollapsiblePanelLayout
        isControlledPanelOpen={validationLogPanel.isOpen}
        onControlledPanelOpenChange={validationLogPanel.toggle}
      >
        <CollapsiblePanelLayout.LeftPanel topic="Storage details">
          <StorageDetailsForm
            initialStorage={initialStorage}
            isVendorsLoading={isVendorsLoading}
            isSaving={isCreating}
            isValidating={isValidating}
            isValidated={isValidated}
            vendors={vendors}
            validationErrorState={validationErrorState}
            submitButtonText="Add storage to COS"
            clearValidationLog={clearValidationLog}
            onValidate={validate}
            onConfirm={createStorage}
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
