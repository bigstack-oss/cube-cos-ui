import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { useFixpackUpdateProgress } from '../_components/useFixpackUpdateProgress'
import { FixpackInstallProgressView } from './FixpackInstallProgressView'
import { FixpackInstallableNodesView } from './FixpackInstallableNodesView'
import { useInstallFixpackModalActionButtonProps } from './useInstallFixpackModalActionButtonProps'
import { isInstallingStatuses } from '../computeFixpacksActionState'
import { FixpackRow } from '../listFixpacksUtils'

type InstallFixpackModalProps = {
  isOpen: boolean
  fixpack: FixpackRow | undefined
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
  const isInstalling = fixpack && isInstallingStatuses(fixpack.status.current)
  const isInstalled = fixpack?.status.current === StatusEnum.Installed

  const { t } = useTranslation()

  const getModalTitle = (): string => {
    if (isInstalled)
      return t(
        'maintenance.update.fixpack.installModal.fixpackInstallCompleted',
      )
    return t('maintenance.update.fixpack.installModal.installFixpack')
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
        <FixpackInstallableNodesView
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
