import { useState } from 'react'

type UseDeleteFixpackModal = {
  fixpackVersionToDelete: string | undefined
  showDeleteFixpackModal: (version: string) => void
  closeDeleteFixpackModal: () => void
}

export const useDeleteFixpackModal = (): UseDeleteFixpackModal => {
  const [fixpackVersionToDelete, setFixpackVersionToDelete] = useState<
    string | undefined
  >(undefined)

  const showDeleteFixpackModal = (version: string): void => {
    setFixpackVersionToDelete(version)
  }

  const closeDeleteFixpackModal = (): void => {
    setFixpackVersionToDelete(undefined)
  }

  return {
    fixpackVersionToDelete,
    showDeleteFixpackModal,
    closeDeleteFixpackModal,
  }
}
