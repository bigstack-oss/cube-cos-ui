import { useMemo, useState } from 'react'
import { FixpackRow } from '../listFixpacksUtils'

type UseDeleteFixpackModal = {
  fixpackToDelete: FixpackRow | undefined
  showDeleteFixpackModal: (version: string) => void
  closeDeleteFixpackModal: () => void
}

export const useDeleteFixpackModal = (
  fixpackRows: FixpackRow[],
): UseDeleteFixpackModal => {
  const [fixpackVersionToDelete, setFixpackVersionToDelete] = useState<
    string | undefined
  >(undefined)

  const fixpackToDelete = useMemo<FixpackRow | undefined>(() => {
    return fixpackRows.find(
      (fixpack) => fixpack.version === fixpackVersionToDelete,
    )
  }, [fixpackRows, fixpackVersionToDelete])

  const showDeleteFixpackModal = (version: string): void => {
    setFixpackVersionToDelete(version)
  }

  const closeDeleteFixpackModal = (): void => {
    setFixpackVersionToDelete(undefined)
  }

  return {
    fixpackToDelete,
    showDeleteFixpackModal,
    closeDeleteFixpackModal,
  }
}
