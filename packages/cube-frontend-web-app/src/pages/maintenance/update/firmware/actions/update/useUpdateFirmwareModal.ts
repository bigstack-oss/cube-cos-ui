import { ListFirmwaresResponseDataFirmwaresInner } from '@cube-frontend/api'
import { useMemo, useState } from 'react'

type UseUpdateFirmwareModal = {
  firmwareToUpdate: ListFirmwaresResponseDataFirmwaresInner | undefined
  onOpenUpdateModal: (version: string) => void
  onCloseUpdateModal: () => void
}

export const useUpdateFirmwareModal = (
  allFirmwares: ListFirmwaresResponseDataFirmwaresInner[],
): UseUpdateFirmwareModal => {
  const [versionToUpdate, setVersionToUpdate] = useState<string | undefined>(
    undefined,
  )

  const firmwareToUpdate = useMemo<
    ListFirmwaresResponseDataFirmwaresInner | undefined
  >(() => {
    if (!versionToUpdate) return undefined
    return allFirmwares.find((firmware) => firmware.version === versionToUpdate)
  }, [allFirmwares, versionToUpdate])

  const onOpenUpdateModal = (version: string): void => {
    setVersionToUpdate(version)
  }

  const onCloseUpdateModal = (): void => {
    setVersionToUpdate(undefined)
  }

  return {
    firmwareToUpdate,
    onOpenUpdateModal,
    onCloseUpdateModal,
  }
}
