import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { StorageDetailsForm } from '../_components/upsert/Form/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { useEditStorage } from './_components/useEditStorage'
import { EditConfirmModal } from './_components/EditConfirmModal'

export const EditStoragePage = () => {
  const {
    initialStorage,
    isLoading: isStorageLoading,
    isUpdating,
    updateConfirmModal,
    goBack,
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
          onConfirm={updateConfirmModal.open}
          onCancel={goBack}
        />
      </CosGeneralPanel>
      <EditConfirmModal
        isOpen={updateConfirmModal.isOpen}
        isUpdating={isUpdating}
        confirm={updateConfirmModal.confirm}
        cancel={updateConfirmModal.cancel}
      />
    </UpsertStorageLayout>
  )
}
