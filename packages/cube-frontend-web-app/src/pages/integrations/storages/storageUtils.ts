import { z } from 'zod'
import {
  GetIntegratedStorageDetailsResponseData,
  ValidateStoragesResponseData,
} from './mock'

export const DEFAULT_VENDOR_QUERY_KEY = 'defaultVendor'

export const isBuiltInStorage = (type: string) => {
  return type === 'built-in'
}

export type StorageForm = {
  asDefault: boolean
  name: string
  vendor: string
  model: string
  port: string
  ip: string
  username: string
  password: string
}

export type ParsedStorageForm = Omit<StorageForm, 'port'> & {
  port: number
}

export type StorageFormValidity = Record<keyof StorageForm, boolean>

export const storageFormSchema = z.object({
  asDefault: z.boolean(),
  name: z.string().min(1),
  vendor: z.string().min(1),
  model: z.string().min(1),
  port: z.string().regex(/^[0-9]{1,}$/),
  ip: z.string().ip(),
  username: z.string().min(1),
  password: z.string().min(1),
})

export const validateStorageForm = (storage: StorageForm) => {
  const errors = storageFormSchema.safeParse(storage).error?.format() ?? {}
  return {
    asDefault: !('asDefault' in errors),
    name: !('name' in errors),
    vendor: !('vendor' in errors),
    model: !('model' in errors),
    port: !('port' in errors),
    ip: !('ip' in errors),
    username: !('username' in errors),
    password: !('password' in errors),
  }
}

export const getInitialStorageForm = (
  initialStorage: Partial<GetIntegratedStorageDetailsResponseData> | undefined,
) => {
  return {
    asDefault: initialStorage?.isDefault ?? false,
    name: initialStorage?.name ?? '',
    vendor: initialStorage?.vendor ?? '',
    model: initialStorage?.model ?? '',
    port: String(initialStorage?.port ?? ''),
    ip: initialStorage?.ip ?? '',
    username: initialStorage?.username ?? '',
    password: '',
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
