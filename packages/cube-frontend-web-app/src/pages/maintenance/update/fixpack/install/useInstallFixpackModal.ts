import { ListFixpacksResponseDataFixpacksInner } from '@cube-frontend/api'
import { useMemo, useState } from 'react'

type UseInstallFixpackModal = {
  isInstallModalOpen: boolean
  fixpackToInstall: ListFixpacksResponseDataFixpacksInner | undefined
  onInstallClick: (fixpack: ListFixpacksResponseDataFixpacksInner) => void
  onInstallModalClose: () => void
}

export const useInstallFixpackModal = (
  fixpacks: ListFixpacksResponseDataFixpacksInner[],
): UseInstallFixpackModal => {
  const [isOpen, setIsOpen] = useState(false)

  const [versionToInstall, setVersionToInstall] = useState<string | undefined>(
    undefined,
  )

  const fixpackToInstall = useMemo<
    ListFixpacksResponseDataFixpacksInner | undefined
  >(() => {
    return fixpacks.find((fixpack) => fixpack.version === versionToInstall)
  }, [fixpacks, versionToInstall])

  const onInstallClick = (
    fixpack: ListFixpacksResponseDataFixpacksInner,
  ): void => {
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
