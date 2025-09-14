import { z } from 'zod'
import { ValidateStoragesResponseData } from './mock'
import {
  GetIntegrationStorageResponseData,
  ListIntegrationStoragesResponseDataInner,
  ListIntegrationStoragesResponseDataInnerStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export const DEFAULT_VENDOR_QUERY_KEY = 'defaultVendor'

export type StorageRow = CosTableRow &
  ListIntegrationStoragesResponseDataInner & {
    rowStates: StorageRowStates
  }

export type StorageRowStates = {
  showProcessing: boolean
  processingMessage: string
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

  // TODO: Add i18n
  const processingMessageMap: Record<
    ListIntegrationStoragesResponseDataInnerStatusCurrentEnum,
    string
  > = {
    ok: 'OK',
    creating: 'Creating',
    updating: 'Updating',
    deleting: 'Deleting',
    verifying: 'Verifying',
    ['setting to default']: 'Setting to default',
  }

  const processing =
    storage.status.isProcessing ||
    creating ||
    updating ||
    deleting ||
    verifying ||
    settingToDefault

  const getProcessingMessage = () => {
    if (creating) return processingMessageMap.creating
    if (updating) return processingMessageMap.updating
    if (deleting) return processingMessageMap.deleting
    if (verifying) return processingMessageMap.verifying
    if (settingToDefault) return processingMessageMap['setting to default']

    return ''
  }

  const processingMessage = getProcessingMessage()

  return {
    processing,
    processingMessage,
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
    processingMessage,
    updating,
    deleting,
    verifying,
    settingToDefault,
  } = calculateStorageProcessingStates(storage, requesting)

  const verifyFailed = verifyFailedStorageNames.has(storage.name)

  return {
    showProcessing: processing,
    processingMessage,
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

export type StorageForm = {
  name: string
  vendor: string
  driver: string
  image: {
    useMultipath: boolean
    forceMultipath: boolean
  }
  volumeTypeSettings: Record<string, string>
  service: {
    driverSection: Record<string, string>
    extraSection: Record<string, string>
    extraConfigFiles: Record<string, string>
  }
}

export type ParsedStorageForm = Omit<StorageForm, 'port'> & {
  port: number
}

export type StorageFormValidity = Record<keyof StorageForm, boolean>

export const storageFormSchema = z.object({
  name: z.string().min(1),
  vendor: z.string().min(1),
  driver: z.string().min(1),
  image: z.object({
    useMultipath: z.boolean(),
    forceMultipath: z.boolean(),
  }),
  // port: z.string().regex(/^[0-9]{1,}$/),
  // ip: z.string().ip(),
  // username: z.string().min(1),
  // password: z.string().min(1),
})

export const validateStorageForm = (storage: StorageForm) => {
  const errors = storageFormSchema.safeParse(storage).error?.format() ?? {}
  return {
    asDefault: !('asDefault' in errors),
    name: !('name' in errors),
    vendor: !('vendor' in errors),
    driver: !('driver' in errors),
    // port: !('port' in errors),
    // ip: !('ip' in errors),
    // username: !('username' in errors),
    // password: !('password' in errors),
  }
}

export const getInitialStorageForm = (
  initialStorage: Partial<GetIntegrationStorageResponseData> | undefined,
) => {
  return {
    // asDefault: initialStorage?.isDefault ?? false,
    name: initialStorage?.name ?? '',
    vendor: initialStorage?.device?.vendor ?? '',
    driver: initialStorage?.name ?? '',
    image: {
      useMultipath: initialStorage?.storage?.image?.useMultipath ?? false,
      forceMultipath: initialStorage?.storage?.image?.forceMultipath ?? false,
    },
    // port: String(initialStorage?.port ?? ''),
    // ip: initialStorage?.ip ?? '',
    // username: initialStorage?.username ?? '',
    // password: '',
  }
}

export const parseStorageForm = (storage: StorageForm): ParsedStorageForm => {
  return {
    ...storage,
    port: parseInt(storage.port, 10),
  }
}

export type StorageLogItem = {
  label: string
  value: string
}

export const validateStorageResponseToLog = (
  data: ValidateStoragesResponseData,
): string => {
  const { status } = data
  const logItems: StorageLogItem[] = [
    {
      label: 'Storage Status',
      value: status,
    },
  ]

  return logItems.map((item) => `${item.label}: ${item.value}`).join('\n')
}
