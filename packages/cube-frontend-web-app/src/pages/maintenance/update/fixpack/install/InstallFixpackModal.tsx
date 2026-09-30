import { ChangeEvent, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { useFixpackUpdateProgress } from '../_components/useFixpackUpdateProgress'
import { SyncingStatus } from '../../_components/SyncingStatus'
import { FixpackInstallProgressView } from './FixpackInstallProgressView'
import { FixpackInstallableNodesView } from './FixpackInstallableNodesView'
import { useInstallFixpackModalActionButtonProps } from './useInstallFixpackModalActionButtonProps'
import {
  isInstallingStatuses,
  isRollingBackStatuses,
} from '../computeFixpacksActionState'
import { FixpackRow } from '../listFixpacksUtils'

type InstallFixpackModalProps = {
  isOpen: boolean
  fixpack: FixpackRow | undefined
  isPartiallyInstalled: boolean
  onInstallationRequested: () => unknown
  onClose: () => void
}

export const InstallFixpackModal = (props: InstallFixpackModalProps) => {
  const {
    isOpen,
    fixpack,
    isPartiallyInstalled,
    onInstallationRequested,
    onClose,
  } = props

  const [isRollbackDisclaimerRead, setIsRollbackDisclaimerRead] =
    useState(false)

  const [selectedNodes, setSelectedNodes] = useState<string[]>([])

  useEffect(() => {
    if (!isOpen) {
      setIsRollbackDisclaimerRead(false)
      setSelectedNodes([])
    }
  }, [isOpen])

  const { isLoadingProgress, progressRows, fetchUpdateProgress } =
    useFixpackUpdateProgress({
      fixpack,
      targetOperation:
        GetFixpackUpdateProgressResponseDataOperationEnum.Install,
    })

  // An installed fixpack some nodes still miss can be installed on them.
  const isInstallable =
    fixpack?.status.current === StatusEnum.Available ||
    (fixpack?.status.current === StatusEnum.Installed && isPartiallyInstalled)
  const isInstalling = fixpack && isInstallingStatuses(fixpack.status.current)
  const isInstalled =
    fixpack?.status.current === StatusEnum.Installed && !isInstallable

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
    isInstallable,
    selectedNodes,
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

  // Auto-close modal when the fixpack starts rolling back.
  useEffect(() => {
    const currentStatus = fixpack?.status.current
    if (isOpen && currentStatus && isRollingBackStatuses(currentStatus)) {
      onClose()
    }
  }, [isOpen, fixpack?.status, onClose])

  const renderContent = () => {
    if (fixpack && isInstallable) {
      return (
        <FixpackInstallableNodesView
          fixpack={fixpack}
          selectedNodes={selectedNodes}
          onSelectedNodesChange={setSelectedNodes}
          isRollbackDisclaimerRead={isRollbackDisclaimerRead}
          isRollbackDisclaimerDisabled={
            modalActionButtonProps.actionButtonProps?.loading ?? false
          }
          onRollbackDisclaimerReadChange={onRollbackDisclaimerReadChange}
        />
      )
    }

    if (isInstalling || isInstalled) {
      return (
        <FixpackInstallProgressView
          isLoading={isLoadingProgress}
          fixpack={fixpack}
          rows={progressRows}
        />
      )
    }

    return <SyncingStatus status={fixpack?.status.current ?? ''} />
  }

  return (
    <CosModal
      title={getModalTitle()}
      isOpen={isOpen}
      onCloseClick={onClose}
      {...modalActionButtonProps}
    >
      {renderContent()}
    </CosModal>
  )
}
