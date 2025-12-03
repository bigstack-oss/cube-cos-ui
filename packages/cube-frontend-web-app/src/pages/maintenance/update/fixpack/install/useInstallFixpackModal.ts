import { useMemo, useState } from 'react'
import { FixpackRow } from '../listFixpacksUtils'

type UseInstallFixpackModal = {
  isInstallModalOpen: boolean
  fixpackToInstall: FixpackRow | undefined
  onInstallClick: (fixpack: FixpackRow) => void
  onInstallModalClose: () => void
}

export const useInstallFixpackModal = (
  fixpacks: FixpackRow[],
): UseInstallFixpackModal => {
  const [isOpen, setIsOpen] = useState(false)

  const [versionToInstall, setVersionToInstall] = useState<string | undefined>(
    undefined,
  )

  const fixpackToInstall = useMemo<FixpackRow | undefined>(() => {
    return fixpacks.find((fixpack) => fixpack.version === versionToInstall)
  }, [fixpacks, versionToInstall])

  const onInstallClick = (fixpack: FixpackRow): void => {
    setVersionToInstall(fixpack.version)
    setIsOpen(true)
  }

  const onInstallModalClose = (): void => {
    setIsOpen(false)
    setVersionToInstall(undefined)
  }

  return {
    isInstallModalOpen: isOpen,
    fixpackToInstall,
    onInstallClick,
    onInstallModalClose,
  }
}
