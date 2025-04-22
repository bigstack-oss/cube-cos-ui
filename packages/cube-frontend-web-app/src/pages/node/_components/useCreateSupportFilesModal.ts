import { useState } from 'react'

type UseCreateSupportFilesModal = {
  isCreateSupportFilesModalOpen: boolean
  comments: string
  onCommentsChange: (value: string) => void
  openCreateSupportFilesModal: () => void
  closeCreateSupportFilesModal: () => void
}

export const useCreateSupportFilesModal = (): UseCreateSupportFilesModal => {
  const [isCreateSupportFilesModalOpen, setIsCreateSupportFilesModalOpen] =
    useState(false)

  const [comments, setComments] = useState('')

  const onCommentsChange = (value: string): void => {
    setComments(value)
  }

  const openCreateSupportFilesModal = (): void => {
    setComments('')
    setIsCreateSupportFilesModalOpen(true)
  }

  const closeCreateSupportFilesModal = (): void => {
    setIsCreateSupportFilesModalOpen(false)
  }

  return {
    isCreateSupportFilesModalOpen,
    comments,
    onCommentsChange,
    openCreateSupportFilesModal,
    closeCreateSupportFilesModal,
  }
}
