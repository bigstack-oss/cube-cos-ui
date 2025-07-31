import { StorageDetailsForm } from '../_components/upsert/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useStorageValidation } from '../_components/upsert/useStorageValidation'
import { ValidationLog } from '../_components/upsert/ValidationLog'
import { useStorageVendors } from '../_components/useStorageVendors'
import { useCreateStorage } from './useCreateStorage'

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
      <StorageDetailsForm
        initialStorage={initialStorage}
        isVendorsLoading={isVendorsLoading}
        isSaving={isCreating}
        isValidating={isValidating}
        isValidated={isValidated}
        vendors={vendors}
        validationErrorState={validationErrorState}
        submitButtonText="Add storage to COS"
        toggleValidationLog={validationLogPanel.toggle}
        clearValidationLog={clearValidationLog}
        onValidate={validate}
        onConfirm={createStorage}
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
