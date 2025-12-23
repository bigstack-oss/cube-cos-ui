import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import {
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { useFixpackUpdateProgress } from '../_components/useFixpackUpdateProgress'
import { SyncingStatus } from '../../_components/SyncingStatus'
import { FixpackRollbackProgressView } from './FixpackRollbackProgressView'
import { FixpackRollbackableNodesView } from './FixpackRollbackableNodesView'
import { useRollbackFixpackModalActionButtonProps } from './useRollbackFixpackModalActionButtonProps'
import {
  isInstallingStatuses,
  isRollbackableFixpack,
  isRollingBackStatuses,
} from '../computeFixpacksActionState'
import { FixpackRow } from '../listFixpacksUtils'

type RollbackFixpackModalProps = {
  isOpen: boolean
  fixpack: FixpackRow | undefined
  onRollbackRequested: () => unknown
  onClose: () => void
}

export const RollbackFixpackModal = (props: RollbackFixpackModalProps) => {
  const { isOpen, fixpack, onRollbackRequested, onClose } = props

  const { isLoadingProgress, progressRows, fetchUpdateProgress } =
    useFixpackUpdateProgress({
      fixpack,
      targetOperation:
        GetFixpackUpdateProgressResponseDataOperationEnum.Rollback,
    })

  const isRollbackable = !!fixpack && isRollbackableFixpack(fixpack)
  const isRollingBack =
    !!fixpack && isRollingBackStatuses(fixpack.status.current)
  const isRolledBack = fixpack?.status.current === StatusEnum.Available

  const { t } = useTranslation()

  const getModalTitle = (): string => {
    if (isRolledBack)
      return t(
        'maintenance.update.fixpack.rollbackModal.fixpackRollbackCompleted',
      )
    return t('maintenance.update.fixpack.rollbackModal.rollbackFixpack')
  }

  const modalActionButtonProps = useRollbackFixpackModalActionButtonProps({
    fixpack,
    progressRows,
    onRollbackRequested,
    onSoftRebootRequested: fetchUpdateProgress,
    onModalClose: onClose,
  })

  // Auto-close the modal if the fixpack starts installing.
  useEffect(() => {
    const currentStatus = fixpack?.status.current
    if (isOpen && currentStatus && isInstallingStatuses(currentStatus)) {
      onClose()
    }
  }, [isOpen, fixpack?.status, onClose])

  const renderContent = () => {
    if (isRollbackable) {
      return <FixpackRollbackableNodesView fixpack={fixpack} />
    }

    if (isRollingBack || isRolledBack) {
      return (
        <FixpackRollbackProgressView
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
