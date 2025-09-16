import {
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInner,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { ChangeEvent, useEffect, useState } from 'react'
import { useFixpackUpdateProgress } from '../_components/useFixpackUpdateProgress'
import { FixpackInstallProgressView } from './FixpackInstallProgressView'
import { FixpackUpdatableNodesView } from './FixpackUpdatableNodesView'
import { useInstallFixpackModalActionButtonProps } from './useInstallFixpackModalActionButtonProps'

type InstallFixpackModalProps = {
  isOpen: boolean
  fixpack: ListFixpacksResponseDataFixpacksInner | undefined
  onInstallationRequested: () => unknown
  onClose: () => void
}

export const InstallFixpackModal = (props: InstallFixpackModalProps) => {
  const { isOpen, fixpack, onInstallationRequested, onClose } = props

  const [isRollbackDisclaimerRead, setIsRollbackDisclaimerRead] =
    useState(false)

  useEffect(() => {
    if (!isOpen) {
      setIsRollbackDisclaimerRead(false)
    }
  }, [isOpen])

  const { isLoadingProgress, progressRows, fetchUpdateProgress } =
    useFixpackUpdateProgress({
      fixpack,
      targetOperation:
        GetFixpackUpdateProgressResponseDataOperationEnum.Install,
    })

  const isInstallable = fixpack?.status.current === StatusEnum.Available

  const isInstalling =
    fixpack?.status.current === StatusEnum.Installing ||
    fixpack?.status.current === StatusEnum.InstallFailed

  const isInstalled = fixpack?.status.current === StatusEnum.Installed

  const getModalTitle = (): string => {
    if (isInstalled) return 'Fixpack Install Completed'
    return 'Install Fixpack'
  }

  const modalActionButtonProps = useInstallFixpackModalActionButtonProps({
    fixpack,
    progressRows,
    isRollbackDisclaimerRead,
    onInstallationRequested,
    onSoftRebootRequested: fetchUpdateProgress,
    onModalClose: onClose,
  })

  const onRollbackDisclaimerReadChange = (
    e: ChangeEvent<HTMLInputElement>,
  ): void => {
    setIsRollbackDisclaimerRead(e.target.checked)
  }

  return (
    <CosModal
      title={getModalTitle()}
      isOpen={isOpen}
      onCloseClick={onClose}
      {...modalActionButtonProps}
    >
      {isInstallable && (
        <FixpackUpdatableNodesView
          fixpack={fixpack}
          isRollbackDisclaimerRead={isRollbackDisclaimerRead}
          isRollbackDisclaimerDisabled={
            modalActionButtonProps.actionButtonProps?.loading ?? false
          }
          onRollbackDisclaimerReadChange={onRollbackDisclaimerReadChange}
        />
      )}
      {(isInstalling || isInstalled) && (
        <FixpackInstallProgressView
          isLoading={isLoadingProgress}
          fixpack={fixpack}
          rows={progressRows}
        />
      )}
    </CosModal>
  )
}
