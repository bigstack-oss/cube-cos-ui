import { useEffect, useRef, useState } from 'react'
import _ from 'lodash'
import { ListIntegrationStoragesResponseDataInner } from '@cube-frontend/api'

const VERIFY_FAILED_TIMEOUT = 5 * 1000

const toStoragesByName = (
  storages: ListIntegrationStoragesResponseDataInner[],
) => _.keyBy(storages, (s) => s.name)

const isVerifyFailedStorage = (
  lastStorage: ListIntegrationStoragesResponseDataInner,
  currentStorage: ListIntegrationStoragesResponseDataInner,
) => {
  return (
    lastStorage.isVerified === false &&
    currentStorage.isVerified === false &&
    lastStorage.status.current === 'verifying' &&
    currentStorage.status.current !== lastStorage.status.current
  )
}

const getVerifyFailedStorageNames = (
  lastStorageData: ListIntegrationStoragesResponseDataInner[],
  currentStorages: ListIntegrationStoragesResponseDataInner[],
): string[] => {
  const lastStoragesByName = toStoragesByName(lastStorageData)
  const currentStoragesByName = toStoragesByName(currentStorages)

  const failedStorageNames: string[] = []

  for (const storageName in currentStoragesByName) {
    const lastStorage = lastStoragesByName[storageName]
    const currentStorage = currentStoragesByName[storageName]

    if (!lastStorage) continue

    if (isVerifyFailedStorage(lastStorage, currentStorage)) {
      failedStorageNames.push(storageName)
    }
  }

  return failedStorageNames
}

export const useVerifyFailedStorage = (
  currentStorages: ListIntegrationStoragesResponseDataInner[] = [],
) => {
  const lastStoragesRef = useRef(currentStorages)

  const [verifyFailedStorageNames, setVerifyFailedStorageNames] = useState<
    Set<string>
  >(new Set())

  const verifyFailedTimeoutRefs = useRef<
    Record<string, ReturnType<typeof setTimeout>>
  >({})

  useEffect(() => {
    const lastStorages = lastStoragesRef.current

    const verifyFailedStorageNames = getVerifyFailedStorageNames(
      lastStorages,
      currentStorages,
    )

    if (verifyFailedStorageNames.length > 0) {
      setVerifyFailedStorageNames((prev) => {
        const newSet = new Set(prev)
        verifyFailedStorageNames.forEach((name) => newSet.add(name))
        return newSet
      })
    }

    const verifyFailedTimeouts = verifyFailedTimeoutRefs.current

    verifyFailedStorageNames.forEach((storageName) => {
      if (verifyFailedTimeouts[storageName]) return

      verifyFailedTimeouts[storageName] = setTimeout(() => {
        setVerifyFailedStorageNames((prev) => {
          const newSet = new Set(prev)
          newSet.delete(storageName)
          return newSet
        })
      }, VERIFY_FAILED_TIMEOUT)
    })

    lastStoragesRef.current = currentStorages

    return () => {
      verifyFailedStorageNames.forEach((storageName) => {
        clearTimeout(verifyFailedTimeouts[storageName])
        delete verifyFailedTimeouts[storageName]
      })
    }
  }, [currentStorages])

  return verifyFailedStorageNames
}
