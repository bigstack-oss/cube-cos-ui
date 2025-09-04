import { useContext, useMemo, useState } from 'react'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { mockGetStoragesModelsApi, mockUploadModelList } from '../../../mock'
import { StorageModelRow, storageToRow } from '../../storagesModelsPageUtils'

export const useStorageModelTable = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data,
    hasResponseBeenReceived,
    getResource: refetchStorageModels,
  } = useCosGetRequest(
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    mockGetStoragesModelsApi,
    () => ({ dataCenter: dataCenter!.name }),
  )

  const { mutateResource: importModel, isLoading: isModelImporting } =
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    // TODO: Replace with actual API call when available
    useCosMutationRequest(mockUploadModelList)

  const { mutateResource: replaceModelList, isLoading: isModelListReplacing } =
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    // TODO: Replace with actual API call when available
    useCosMutationRequest(mockUploadModelList)

  const { mutateResource: removeModel } =
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    // TODO: Replace with actual API call when available
    useCosMutationRequest(mockUploadModelList)

  const { mutateResource: replaceModel, isLoading: isModelReplacing } =
    // @ts-expect-error - Temporarily using mock data until backend API is ready
    // TODO: Replace with actual API call when available
    useCosMutationRequest(mockUploadModelList)

  const [removingDeviceIds, setRemovingDeviceIds] = useState<Set<string>>(
    () => new Set(),
  )
  const [replacingDeviceIds, setReplacingDeviceIds] = useState<Set<string>>(
    () => new Set(),
  )

  const rows = useMemo(
    () =>
      (data || []).map((item) => {
        return storageToRow(
          item,
          removingDeviceIds,
          replacingDeviceIds,
          isModelListReplacing,
        )
      }),
    [data, isModelListReplacing, removingDeviceIds, replacingDeviceIds],
  )

  const [viewTargetRow, setViewTargetRow] = useState<
    StorageModelRow | undefined
  >()

  const [removeTargetRow, setRemoveTargetRow] = useState<
    StorageModelRow | undefined
  >()

  const importModelAction = {
    title: 'Import a new model',
    isLoading: isModelImporting,
    disabled: isModelListReplacing,
    upload: async (file: File) => {
      await importModel({ dataCenter: dataCenter!.name, file })
      refetchStorageModels()
    },
  }

  const replaceModelListAction = {
    title: 'Replace Model List',
    isLoading: isModelListReplacing,
    disabled:
      isModelImporting ||
      removingDeviceIds.size > 0 ||
      replacingDeviceIds.size > 0,
    upload: async (file: File) => {
      await replaceModelList({ dataCenter: dataCenter!.name, file })
      refetchStorageModels()
    },
  }

  const viewAction = {
    row: viewTargetRow,
    isModalOpen: !!viewTargetRow,
    openModal: setViewTargetRow,
    closeModal: () => setViewTargetRow(undefined),
  }

  const replaceAction = {
    isLoading: isModelReplacing,
    upload: async (row: StorageModelRow, file: File) => {
      setReplacingDeviceIds((ids) => new Set(ids).add(row.id))
      try {
        await replaceModel({
          dataCenter: dataCenter!.name,
          vendor: row.vendor,
          model: row.model,
          file,
        })
      } finally {
        setReplacingDeviceIds((ids) => {
          const newIds = new Set(ids)
          newIds.delete(row.id)
          return newIds
        })
      }
      await refetchStorageModels()
    },
  }

  const removeAction = {
    row: removeTargetRow,
    isConfirmModalOpen: !!removeTargetRow,
    openConfirmModal: setRemoveTargetRow,
    confirm: async () => {
      if (!removeTargetRow) return

      setRemovingDeviceIds((ids) => new Set(ids).add(removeTargetRow.id))
      setRemoveTargetRow(undefined)

      try {
        await removeModel({
          dataCenter: dataCenter!.name,
          vendor: removeTargetRow.vendor,
          model: removeTargetRow.model,
        })
      } finally {
        setRemovingDeviceIds((ids) => {
          const newIds = new Set(ids)
          newIds.delete(removeTargetRow.id)
          return newIds
        })
      }

      await refetchStorageModels()
    },
    closeConfirmModal: () => setRemoveTargetRow(undefined),
  }

  const tableActions = [importModelAction, replaceModelListAction]

  const rowActions = {
    view: viewAction,
    replace: replaceAction,
    remove: removeAction,
  }

  return {
    rows,
    showLoading: !hasResponseBeenReceived,
    tableActions,
    rowActions,
  }
}
