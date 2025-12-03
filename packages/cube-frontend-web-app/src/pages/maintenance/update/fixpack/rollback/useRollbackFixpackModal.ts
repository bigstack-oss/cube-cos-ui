import { useMemo, useState } from 'react'
import { FixpackRow } from '../listFixpacksUtils'

type UseRollbackFixpackModal = {
  isRollbackModalOpen: boolean
  fixpackToRollback: FixpackRow | undefined
  onRollbackClick: (fixpack: FixpackRow) => void
  onRollbackModalClose: () => void
}

export const useRollbackFixpackModal = (
  fixpacks: FixpackRow[],
): UseRollbackFixpackModal => {
  const [isOpen, setIsOpen] = useState(false)

  const [versionToRollback, setVersionToRollback] = useState<
    string | undefined
  >(undefined)

  const fixpackToRollback = useMemo<FixpackRow | undefined>(() => {
    return fixpacks.find((fixpack) => fixpack.version === versionToRollback)
  }, [fixpacks, versionToRollback])

  const onRollbackClick = (fixpack: FixpackRow): void => {
    setVersionToRollback(fixpack.version)
    setIsOpen(true)
  }

  const onRollbackModalClose = (): void => {
    setIsOpen(false)
    setVersionToRollback(undefined)
  }

  return {
    isRollbackModalOpen: isOpen,
    fixpackToRollback,
    onRollbackClick,
    onRollbackModalClose,
  }
}
