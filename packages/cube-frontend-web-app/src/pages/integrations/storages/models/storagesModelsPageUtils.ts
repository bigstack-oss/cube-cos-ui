import { ListIntegrationStorageModelsResponseDataInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type StorageModelRow = CosTableRow &
  ListIntegrationStorageModelsResponseDataInner & {
    state: {
      isRemoving: boolean
      isReplacing: boolean
      isProcessing: boolean
    }
  }

export const MODEL_UPLOAD_FILE_TYPE = '.yaml,.yml'

export const getTableRowId = (
  storage: ListIntegrationStorageModelsResponseDataInner,
) => storage.driver

export const storageToRow = (
  storage: ListIntegrationStorageModelsResponseDataInner,
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
