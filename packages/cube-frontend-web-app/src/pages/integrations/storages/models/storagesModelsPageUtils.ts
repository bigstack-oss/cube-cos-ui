import { CosTableRow } from '@cube-frontend/ui-library'
import { GetStorageModel } from '../mock'

export type StorageModelRow = CosTableRow &
  GetStorageModel & {
    state: {
      isRemoving: boolean
      isReplacing: boolean
      isProcessing: boolean
    }
  }

export const MODEL_UPLOAD_FILE_TYPE = '.yaml,.yml'

export const getTableRowId = (storage: GetStorageModel) =>
  `${storage.vendor}-${storage.model}`

export const storageToRow = (
  storage: GetStorageModel,
  removingDeviceIds: Set<string>,
  replacingDeviceIds: Set<string>,
  isFullListReplacing: boolean,
): StorageModelRow => {
  const id = getTableRowId(storage)

  const isRemoving = removingDeviceIds.has(id)
  const isReplacing = replacingDeviceIds.has(id) || isFullListReplacing
  const isProcessing = isRemoving || isReplacing

  return {
    ...storage,
    id,
    state: {
      isRemoving,
      isReplacing,
      isProcessing,
    },
  }
}
