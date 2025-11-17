import { useEffect, useMemo, useState } from 'react'
import {
  GetIntegrationStorageResponseData,
  ListIntegrationStorageModelsResponseDataInner,
} from '@cube-frontend/api'
import {
  getInitialStorageForm,
  StorageForm,
  StorageFormError,
  validateStorageForm,
} from './storageFormUtils'

export const useStorageForm = (
  initialStorage: GetIntegrationStorageResponseData | undefined,
  selectedModel: ListIntegrationStorageModelsResponseDataInner | undefined,
) => {
  const [storage, setStorage] = useState<StorageForm>(() =>
    getInitialStorageForm({
      currentName: '',
      initialStorage,
      selectedModel,
    }),
  )

  useEffect(() => {
    setStorage((previousStorage) => {
      return getInitialStorageForm({
        currentName: previousStorage.name,
        initialStorage,
        selectedModel,
      })
    })
  }, [initialStorage, selectedModel])

  const fieldErrors = useMemo<StorageFormError | undefined>(() => {
    return validateStorageForm(storage)
  }, [storage])

  const allFieldsValid = useMemo(() => {
    return !fieldErrors
  }, [fieldErrors])

  return {
    storage,
    fieldErrors,
    allFieldsValid,
    setStorage,
  }
}
