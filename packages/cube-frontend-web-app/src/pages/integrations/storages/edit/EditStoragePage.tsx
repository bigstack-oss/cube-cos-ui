import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageDetailsForm } from '../_components/upsert/Form/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useEditStorage } from './useEditStorage'

export const EditStoragePage = () => {
  const {
    initialStorage,
    isLoading: isStorageLoading,
    isUpdating,
    updateStorage,
    cancel,
  } = useEditStorage()

  return (
    <UpsertStorageLayout title="Edit Storage">
      <CosGeneralPanel>
        <StorageDetailsForm
          isEdit={true}
          initialStorage={initialStorage}
          isInitialStorageLoading={isStorageLoading}
          isSaving={isUpdating}
          submitButtonText="Update"
          onConfirm={updateStorage}
          onCancel={cancel}
        />
      </CosGeneralPanel>
    </UpsertStorageLayout>
  )
}
