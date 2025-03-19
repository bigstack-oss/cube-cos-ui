import { useState } from 'react'

type UseDeleteSlackChannelModal = {
  isDeleteModalOpen: boolean
  toBeDeletedRowId: string | undefined
  onDeleteClick: (rowId: string) => void
  onCloseDeleteModal: () => void
}

export const useDeleteSlackChannelModal = (): UseDeleteSlackChannelModal => {
  const [toBeDeletedRowId, setToBeDeletedRowId] = useState<string | undefined>(
    undefined,
  )

  const onDeleteClick = (rowId: string): void => {
    setToBeDeletedRowId(rowId)
  }

  const onCloseDeleteModal = (): void => {
    setToBeDeletedRowId(undefined)
  }

  return {
    isDeleteModalOpen: !!toBeDeletedRowId,
    toBeDeletedRowId,
    onDeleteClick,
    onCloseDeleteModal,
  }
}
