import { useTranslation } from 'react-i18next'
import {
  GetFixpackUpdateProgressResponseDataOperationEnum,
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as StatusEnum,
} from '@cube-frontend/api'
import { CosModal } from '@cube-frontend/ui-library'
import { useFixpackUpdateProgress } from '../_components/useFixpackUpdateProgress'
import { FixpackRollbackProgressView } from './FixpackRollbackProgressView'
import { FixpackRollbackableNodesView } from './FixpackRollbackableNodesView'
import { useRollbackFixpackModalActionButtonProps } from './useRollbackFixpackModalActionButtonProps'
import {
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

  return (
    <CosModal
      title={getModalTitle()}
      isOpen={isOpen}
      onCloseClick={onClose}
      {...modalActionButtonProps}
    >
      {isRollbackable && <FixpackRollbackableNodesView fixpack={fixpack} />}
      {(isRollingBack || isRolledBack) && (
        <FixpackRollbackProgressView
          isLoading={isLoadingProgress}
          fixpack={fixpack}
          rows={progressRows}
        />
      )}
    </CosModal>
  )
}
