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
  baseModel: ListIntegrationStorageModelsResponseDataInner | undefined,
) => {
  const [storage, setStorage] = useState<StorageForm>(() =>
    getInitialStorageForm({
      initialStorage,
      previousStorage: undefined,
      baseModel,
    }),
  )

  useEffect(() => {
    setStorage((previousStorage) => {
      return getInitialStorageForm({
        initialStorage,
        previousStorage,
        baseModel,
      })
    })
  }, [initialStorage, baseModel])

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
