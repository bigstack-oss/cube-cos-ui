import { StorageDetailsForm } from '../_components/upsert/Form/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { useCreateStorage } from './useCreateStorage'

export const CreateStoragePage = () => {
  const { isCreating, createStorage, cancel } = useCreateStorage()

  return (
    <UpsertStorageLayout title="Add Storage">
      <CosGeneralPanel>
        <StorageDetailsForm
          isSaving={isCreating}
          submitButtonText="Add storage to COS"
          onConfirm={createStorage}
          onCancel={cancel}
        />
      </CosGeneralPanel>
    </UpsertStorageLayout>
  )
}
