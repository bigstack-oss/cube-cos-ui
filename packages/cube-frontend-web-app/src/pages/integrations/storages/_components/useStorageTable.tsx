import { useContext, useMemo, useState } from 'react'
import _ from 'lodash'
import { integrationsApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import {
  IntegrationsApiSetStorageAsDefaultRequest,
  IntegrationsApiVerifyStorageIntegrationRequest,
} from '@cube-frontend/api'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { RequestingStorages, StorageRow } from '../storageUtils'
import { useStorageTableRows } from './useStorageTableRows'

const STORAGE_POLLING_INTERVAL = 10 * 1000

export type UseStorageTable = {
  rows: StorageRow[]
  showLoading: boolean
  rowActions: {
    setDefault: (row: StorageRow) => void
    verify: (row: StorageRow) => void
    delete: {
      row: StorageRow | undefined
      isConfirmModalOpen: boolean
      isRequesting: boolean
      openConfirmModal: (row: StorageRow) => void
      closeConfirmModal: () => void
      confirm: () => Promise<void>
    }
  }
}

export const useStorageTable = (): UseStorageTable => {
  const { dataCenter } = useContext(DataCenterContext)

  const {
    data,
    hasResponseBeenReceived,
    getResource: fetchIntegrationStorages,
  } = useCosGetRequest(integrationsApi.listIntegrationStorages, () => ({
    dataCenter: dataCenter!.name,
  }))

  usePolling(fetchIntegrationStorages, STORAGE_POLLING_INTERVAL)

  const [
    requestingSetDefaultStorageNames,
    setRequestingSetDefaultStorageNames,
  ] = useState<Set<string>>(() => new Set())

  const { mutateResource: requestSetDefault } = useCosMutationRequest(
    integrationsApi.setStorageAsDefault,
  )

  const setStorageToDefault = async (row: StorageRow) => {
    const req: IntegrationsApiSetStorageAsDefaultRequest = {
      dataCenter: dataCenter!.name,
      storageName: row.name,
    }

    try {
      setRequestingSetDefaultStorageNames((prev) => new Set(prev).add(row.name))
      await requestSetDefault(req)
      await fetchIntegrationStorages()
    } catch (error) {
      console.error('Error setting default storage:', error)
    } finally {
      setRequestingSetDefaultStorageNames((prev) => {
        const newSet = new Set(prev)
        newSet.delete(row.name)
        return newSet
      })
    }
  }

  const { mutateResource: requestVerify } = useCosMutationRequest(
    integrationsApi.verifyStorageIntegration,
  )

  const [requestingVerifyStorageNames, setRequestingVerifyStorageNames] =
    useState<Set<string>>(() => new Set())

  const verifyStorage = async (row: StorageRow) => {
    const req: IntegrationsApiVerifyStorageIntegrationRequest = {
      dataCenter: dataCenter!.name,
      storageName: row.name,
    }

    try {
      setRequestingVerifyStorageNames((prev) => new Set(prev).add(row.name))
      await requestVerify(req)
      await fetchIntegrationStorages()
    } catch (error) {
      console.error('Error verifying storage:', error)
    } finally {
      setRequestingVerifyStorageNames((prev) => {
        const newSet = new Set(prev)
        newSet.delete(row.name)
        return newSet
      })
    }
  }

  const [deleteTargetRow, setDeleteTargetRow] = useState<
    StorageRow | undefined
  >(undefined)

  const [requestingDeleteStorageNames, setRequestingDeleteStorageNames] =
    useState<Set<string>>(() => new Set())

  const { mutateResource: requestDelete } = useCosMutationRequest(
    integrationsApi.deleteIntegrationStorage,
  )

  const closeDeleteConfirmModal = () => setDeleteTargetRow(undefined)

  const deleteStorage = async (row: StorageRow) => {
    const req: IntegrationsApiSetStorageAsDefaultRequest = {
      dataCenter: dataCenter!.name,
      storageName: row.name,
    }

    try {
      setRequestingDeleteStorageNames((prev) => new Set(prev).add(row.name))
      await requestDelete(req)
      await fetchIntegrationStorages()
    } catch (error) {
      console.error('Error deleting storage:', error)
    } finally {
      setRequestingDeleteStorageNames((prev) => {
        const newSet = new Set(prev)
        newSet.delete(row.name)
        return newSet
      })
    }
  }

  const isTargetRowRequestingDelete = (row: StorageRow | undefined) => {
    if (!row) return false
    return requestingDeleteStorageNames.has(row.name)
  }

  const deleteAction = {
    row: deleteTargetRow,
    isConfirmModalOpen: !!deleteTargetRow,
    openConfirmModal: setDeleteTargetRow,
    isRequesting: isTargetRowRequestingDelete(deleteTargetRow),
    closeConfirmModal: closeDeleteConfirmModal,
    confirm: async () => {
      if (!deleteTargetRow) return
      await deleteStorage(deleteTargetRow)
      closeDeleteConfirmModal()
    },
  }

  const requestingStorages: RequestingStorages = useMemo(
    () => ({
      verifyNames: requestingVerifyStorageNames,
      setDefaultNames: requestingSetDefaultStorageNames,
      deleteNames: requestingDeleteStorageNames,
    }),
    [
      requestingVerifyStorageNames,
      requestingSetDefaultStorageNames,
      requestingDeleteStorageNames,
    ],
  )

  const rows = useStorageTableRows(data || [], requestingStorages)

  const rowActions = {
    delete: deleteAction,
    verify: verifyStorage,
    setDefault: setStorageToDefault,
  }

  return {
    rows,
    showLoading: !hasResponseBeenReceived,
    rowActions,
  }
}
