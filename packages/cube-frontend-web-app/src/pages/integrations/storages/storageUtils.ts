import { ListIntegrationStoragesResponseDataInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export const DEFAULT_VENDOR_QUERY_KEY = 'defaultVendor'

export type StorageRow = CosTableRow &
  ListIntegrationStoragesResponseDataInner & {
    rowStates: StorageRowStates
  }

export type ProcessingType =
  | 'creating'
  | 'updating'
  | 'deleting'
  | 'verifying'
  | 'setting to default'

export type StorageRowStates = {
  showProcessing: boolean
  processingType: ProcessingType | null
  verify: {
    hidden: boolean
    disabled: boolean
    loading: boolean
    failed: boolean
  }
  edit: {
    hidden: boolean
    disabled: boolean
    loading: boolean
  }
  delete: {
    hidden: boolean
    disabled: boolean
    loading: boolean
  }
  setDefault: {
    disabled: boolean
    loading: boolean
  }
}

export type RequestingStorages = {
  verifyNames: Set<string>
  setDefaultNames: Set<string>
  deleteNames: Set<string>
}

const isBuiltInStorage = (type: string) => {
  return type === 'built-in'
}

export const isSettingsToDefault = (
  storage: ListIntegrationStoragesResponseDataInner,
  settingDefaultStorageNames: Set<string>,
) => {
  const settingToDefault =
    settingDefaultStorageNames.has(storage.name) ||
    storage.status.current === 'setting to default'

  return settingToDefault
}

const calculateStorageProcessingStates = (
  storage: ListIntegrationStoragesResponseDataInner,
  requesting: RequestingStorages,
) => {
  const creating = storage.status.current === 'creating'

  const updating = storage.status.current === 'updating'

  const deleting =
    requesting.deleteNames.has(storage.name) ||
    storage.status.current === 'deleting'

  const verifying =
    requesting.verifyNames.has(storage.name) ||
    storage.status.current === 'verifying'

  const settingToDefault = isSettingsToDefault(
    storage,
    requesting.setDefaultNames,
  )

  const processing =
    storage.status.isProcessing ||
    creating ||
    updating ||
    deleting ||
    verifying ||
    settingToDefault

  const getProcessingType = (): ProcessingType | null => {
    if (creating) return 'creating'
    if (updating) return 'updating'
    if (deleting) return 'deleting'
    if (verifying) return 'verifying'
    if (settingToDefault) return 'setting to default'

    return null
  }

  const processingType = getProcessingType()

  return {
    processing,
    processingType,
    creating,
    updating,
    deleting,
    verifying,
    settingToDefault,
  }
}

export const calculateStorageRowStates = (
  storage: ListIntegrationStoragesResponseDataInner,
  requesting: RequestingStorages,
  hasSettingToDefaultStorage: boolean,
  verifyFailedStorageNames: Set<string>,
) => {
  const isBuiltIn = isBuiltInStorage(storage.type)

  const {
    processing,
    processingType,
    updating,
    deleting,
    verifying,
    settingToDefault,
  } = calculateStorageProcessingStates(storage, requesting)

  const verifyFailed = verifyFailedStorageNames.has(storage.name)

  return {
    showProcessing: processing,
    processingType,
    verify: {
      hidden: isBuiltIn,
      disabled: isBuiltIn || storage.isVerified || processing,
      loading: verifying,
      failed: verifyFailed,
    },
    edit: {
      hidden: isBuiltIn,
      disabled: isBuiltIn || processing,
      loading: updating,
    },
    delete: {
      hidden: isBuiltIn,
      disabled: isBuiltIn || storage.isDefault || processing,
      loading: deleting,
    },
    setDefault: {
      disabled:
        !storage.isVerified ||
        storage.isDefault ||
        processing ||
        hasSettingToDefaultStorage,
      loading: settingToDefault,
    },
  }
}

const storageToRow = (
  storage: ListIntegrationStoragesResponseDataInner,
  requesting: RequestingStorages,
  hasSettingToDefaultStorage: boolean,
  verifyFailedStorageNames: Set<string>,
): StorageRow => {
  return {
    ...storage,
    id: storage.name,
    rowStates: calculateStorageRowStates(
      storage,
      requesting,
      hasSettingToDefaultStorage,
      verifyFailedStorageNames,
    ),
  }
}

export const toStorageRows = (
  storages: ListIntegrationStoragesResponseDataInner[] = [],
  requesting: RequestingStorages,
  verifyFailedStorageNames: Set<string>,
) => {
  const hasSettingToDefaultStorage = storages.some((storage) =>
    isSettingsToDefault(storage, requesting.setDefaultNames),
  )

  return storages.map((storage) =>
    storageToRow(
      storage,
      requesting,
      hasSettingToDefaultStorage,
      verifyFailedStorageNames,
    ),
  )
}
