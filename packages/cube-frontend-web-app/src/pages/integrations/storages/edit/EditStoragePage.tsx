import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { ValidationLog } from '../_components/upsert/ValidationLog'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { useStorageVendors } from '../_components/useStorageVendors'
import { useEditStorage } from './useEditStorage'

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
        toggleValidationLog={validationLogPanel.toggle}
        clearValidationLog={clearValidationLog}
        onValidate={validate}
        onConfirm={updateStorage}
        onCancel={cancel}
      />
      <ValidationLog
        isOpen={validationLogPanel.isOpen}
        log={validationLog}
        onClose={validationLogPanel.close}
      />
    </UpsertStorageLayout>
  )
}
