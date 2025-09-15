import { useState } from 'react'

type UseDeleteFirmwareModal = {
  firmwareVersionToDelete: string | undefined
  showDeleteFirmwareModal: (version: string) => void
  closeDeleteFirmwareModal: () => void
}

export const useDeleteFirmwareModal = (): UseDeleteFirmwareModal => {
  const [firmwareVersionToDelete, setFirmwareVersionToDelete] = useState<
    string | undefined
  >(undefined)

  const showDeleteFirmwareModal = (version: string): void => {
    setFirmwareVersionToDelete(version)
  }

  const closeDeleteFirmwareModal = (): void => {
    setFirmwareVersionToDelete(undefined)
  }

  return {
    firmwareVersionToDelete,
    showDeleteFirmwareModal,
    closeDeleteFirmwareModal,
  }
}
