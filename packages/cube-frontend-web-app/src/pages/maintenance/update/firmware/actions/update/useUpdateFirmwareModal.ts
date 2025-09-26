import { ListFirmwaresResponseDataFirmwaresInner } from '@cube-frontend/api'
import { useMemo, useState } from 'react'
import { FirmwareRow } from '../../listFirmwaresUtils'

type UseUpdateFirmwareModal = {
  firmwareToUpdate: ListFirmwaresResponseDataFirmwaresInner | undefined
  onOpenUpdateModal: (version: string) => void
  onCloseUpdateModal: () => void
}

export const useUpdateFirmwareModal = (
  firmwareRows: FirmwareRow[],
): UseUpdateFirmwareModal => {
  const [versionToUpdate, setVersionToUpdate] = useState<string | undefined>(
    undefined,
  )

  const firmwareToUpdate = useMemo<
    ListFirmwaresResponseDataFirmwaresInner | undefined
  >(() => {
    if (!versionToUpdate) return undefined
    return firmwareRows.find((firmware) => firmware.version === versionToUpdate)
  }, [firmwareRows, versionToUpdate])

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
