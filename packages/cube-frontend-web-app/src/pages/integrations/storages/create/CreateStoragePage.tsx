import { StorageDetailsForm } from '../_components/upsert/Form/StorageDetailsForm'
import { UpsertStorageLayout } from '../_components/upsert/UpsertStorageLayout'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { useCreateStorage } from './useCreateStorage'
import { useTranslation } from 'react-i18next'

export const CreateStoragePage = () => {
  const { t } = useTranslation()

  const { isCreating, createStorage, cancel } = useCreateStorage()

  return (
    <UpsertStorageLayout title={t('integrations.storages.upsert.addStorage')}>
      <CosGeneralPanel>
        <StorageDetailsForm
          isSaving={isCreating}
          submitButtonText={t('integrations.storages.upsert.addStorageToCos')}
          onConfirm={createStorage}
          onCancel={cancel}
        />
      </CosGeneralPanel>
    </UpsertStorageLayout>
  )
}
