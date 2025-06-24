import { useState } from 'react'

type UseResetTuningModal = {
  isResetModalOpen: boolean
  toBeResetRowId: string | undefined
  onResetClick: (rowId: string) => void
  onCloseResetModal: () => void
}

export const useResetTuningModal = (): UseResetTuningModal => {
  const [toBeResetRowId, setToBeResetRowId] = useState<string | undefined>(
    undefined,
  )

  const onResetClick = (rowId: string): void => {
    setToBeResetRowId(rowId)
  }

  const onCloseResetModal = (): void => {
    setToBeResetRowId(undefined)
  }

  return {
    isResetModalOpen: !!toBeResetRowId,
    toBeResetRowId,
    onResetClick,
    onCloseResetModal,
  }
}
