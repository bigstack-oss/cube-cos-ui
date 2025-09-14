import { ListIntegrationStorageModelsResponseDataInner } from '@cube-frontend/api'
import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  getInitialStorageForm,
  ParsedStorageForm,
  parseStorageForm,
  StorageForm,
  StorageFormValidity,
  validateStorageForm,
} from '../../storageUtils'

export const useStorageForm = (
  initialStorage:
    | Partial<ListIntegrationStorageModelsResponseDataInner>
    | undefined,
) => {
  const [storage, setStorage] = useState<StorageForm>(() =>
    getInitialStorageForm(initialStorage),
  )

  useEffect(() => {
    if (initialStorage) {
      setStorage(getInitialStorageForm(initialStorage))
    }
  }, [initialStorage])

  const fieldsValidity = useMemo<StorageFormValidity>(() => {
    return validateStorageForm(storage)
  }, [storage])

  const allFieldsValid = useMemo(() => {
    return Object.values(fieldsValidity).every((isValid) => isValid)
  }, [fieldsValidity])

  const setStorageField = useCallback(
    <Key extends keyof StorageForm>(key: Key, value: StorageForm[Key]) => {
      setStorage((prev) => ({
        ...prev,
        [key]: value,
      }))
    },
    [],
  )

  const updateStorageField = useCallback(
    <Key extends keyof StorageForm>(key: Key, value: StorageForm[Key]) => {
      setStorageField(key, value)
      if (key === 'vendor') {
        setStorageField('model', '')
      }
    },
    [setStorageField],
  )

  const getParsedStorage = (): ParsedStorageForm => {
    return parseStorageForm(storage)
  }

  return {
    storage,
    fieldsValidity,
    allFieldsValid,
    updateStorageField,
    getParsedStorage,
  }
}
