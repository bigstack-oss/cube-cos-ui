import { useState } from 'react'

type UseReleaseNotePanel<T> = {
  rowForReleaseNote: T | undefined
  isReleaseNotePanelOpen: boolean
  showReleaseNoteFor: (row: T) => void
  onReleaseNotePanelClose: () => void
  toggleReleaseNotePanel: () => void
}

export const useReleaseNotePanel = <T>(): UseReleaseNotePanel<T> => {
  const [selectedRow, setSelectedRow] = useState<T | undefined>()
  const [isOpen, setIsOpen] = useState(false)

  const showReleaseNoteFor = (row: T): void => {
    setSelectedRow(row)
    setIsOpen(true)
  }

  const onReleaseNotePanelClose = (): void => {
    setIsOpen(false)
  }

  const toggleReleaseNotePanel = (): void => {
    setIsOpen((prev) => !prev)
  }

  return {
    rowForReleaseNote: selectedRow,
    isReleaseNotePanelOpen: isOpen,
    showReleaseNoteFor,
    onReleaseNotePanelClose,
    toggleReleaseNotePanel,
  }
}
