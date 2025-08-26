import {
  UseOpenState,
  useOpenState,
} from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { useState } from 'react'

type UseReleaseNotePanel<T> = {
  rowForReleaseNote: T | undefined
  showReleaseNoteFor: (row: T) => void
  releaseNotePanel: UseOpenState
}

export const useReleaseNotePanel = <T>(): UseReleaseNotePanel<T> => {
  const [selectedRow, setSelectedRow] = useState<T | undefined>()
  const releaseNotePanel = useOpenState(false)

  const showReleaseNoteFor = (row: T): void => {
    setSelectedRow(row)
    releaseNotePanel.open()
  }

  return {
    rowForReleaseNote: selectedRow,
    showReleaseNoteFor,
    releaseNotePanel,
  }
}
