import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
import { useMemo, useState } from 'react'

type UseRollbackFixpackModal = {
  isRollbackModalOpen: boolean
  fixpackToRollback: ListFixpacksResponseDataFixpacksInner | undefined
  onRollbackClick: (fixpack: ListFixpacksResponseDataFixpacksInner) => void
  onRollbackModalClose: () => void
}

export const useRollbackFixpackModal = (
  fixpacks: ListFixpacksResponseDataFixpacksInner[],
): UseRollbackFixpackModal => {
  const [isOpen, setIsOpen] = useState(false)

  const [versionToRollback, setVersionToRollback] = useState<
    string | undefined
  >(undefined)

  const fixpackToRollback = useMemo<
    ListFixpacksResponseDataFixpacksInner | undefined
  >(() => {
    return fixpacks.find((fixpack) => fixpack.version === versionToRollback)
  }, [fixpacks, versionToRollback])

  const onRollbackClick = (
    fixpack: ListFixpacksResponseDataFixpacksInner,
  ): void => {
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
