import { useMemo } from 'react'
import { ListIntegrationStoragesResponseDataInner } from '@cube-frontend/api'
import { RequestingStorages, toStorageRows } from '../storageUtils'
import { useVerifyFailedStorage } from './useVerifyFailedStorage'

export const useStorageTableRows = (
  storages: ListIntegrationStoragesResponseDataInner[],
  requesting: RequestingStorages,
) => {
  const verifyFailedStorageNames = useVerifyFailedStorage(storages)

  const rows = useMemo(
    () => toStorageRows(storages, requesting, verifyFailedStorageNames),
    [storages, requesting, verifyFailedStorageNames],
  )

  return rows
}
