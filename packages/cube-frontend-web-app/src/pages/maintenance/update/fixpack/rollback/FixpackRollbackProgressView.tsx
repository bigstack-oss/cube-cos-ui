import { useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import {
  ListFixpacksResponseDataFixpacksInnerStatusCurrentEnum as FixpackStatus,
  GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ListFixpacksResponseDataFixpacksInner,
  GetFixpackUpdateProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus,
} from '@cube-frontend/api'
import { CosInlineNotification } from '@cube-frontend/ui-library'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import {
  StatusWithIcon,
  StatusWithIconProps,
} from '../../_components/StatusWithIcon'
import { FixpackUpdateProgressTable } from '../_components/FixpackUpdateProgressTable'
import {
  getShowRebootHint,
  ProgressTableRow,
} from '../_components/fixpackUpdateUtils'

type FixpackInstallProgressViewProps = {
  isLoading: boolean
  fixpack: ListFixpacksResponseDataFixpacksInner
  rows: ProgressTableRow[]
}

const useStatusDisplay = () => {
  const { t } = useTranslation()

  return {
    [ProgressStatus.Available]: t(
      'maintenance.update.fixpack.rollbackModal.status.succeeded',
    ),
    [ProgressStatus.RollingBack]: t(
      'maintenance.update.fixpack.rollbackModal.status.updating',
    ),
    [ProgressStatus.RollbackFailed]: t(
      'maintenance.update.fixpack.rollbackModal.status.failed',
    ),
    [ProgressStatus.Resolved]: t(
      'maintenance.update.fixpack.rollbackModal.status.resolved',
    ),
    [ProgressStatus.WaitingReboot]: t(
      'maintenance.update.fixpack.rollbackModal.status.pendingReboot',
    ),
    [ProgressStatus.Rebooting]: t(
      'maintenance.update.fixpack.rollbackModal.status.rebooting',
    ),
  } as const
}

const useStatusWithIconPropsMap = (): Partial<
  Record<ProgressStatus, StatusWithIconProps>
> => {
  const statusTranslations = useStatusDisplay()

  return {
    [ProgressStatus.Available]: {
      Icon: CheckmarkCircleFill,
      text: statusTranslations[ProgressStatus.Available],
      color: 'text-status-positive',
    },
    [ProgressStatus.RollbackFailed]: {
      Icon: CrossFill,
      text: statusTranslations[ProgressStatus.RollbackFailed],
      color: 'text-status-negative',
    },
    [ProgressStatus.Resolved]: {
      Icon: CircleFill,
      text: statusTranslations[ProgressStatus.Resolved],
      color: 'text-status-neutral',
    },
    [ProgressStatus.WaitingReboot]: {
      Icon: CircleFill,
      text: statusTranslations[ProgressStatus.WaitingReboot],
      color: 'text-status-positive',
    },
    [ProgressStatus.Rebooting]: {
      Icon: CircleFill,
      text: statusTranslations[ProgressStatus.Rebooting],
      color: 'text-status-positive',
    },
  }
}

export const FixpackRollbackProgressView = (
  props: FixpackInstallProgressViewProps,
) => {
  const { isLoading, fixpack, rows } = props

  const isRolledBack = fixpack.status.current === FixpackStatus.Available

  const hasFailedNode = useMemo<boolean>(() => {
    return rows.some(
      (row) => row.status.current === ProgressStatus.RollbackFailed,
    )
  }, [rows])

  const showRebootHint = useMemo<boolean>(
    () => getShowRebootHint(fixpack, rows),
    [fixpack, rows],
  )

  const { t } = useTranslation()

  const getDescription = () => {
    if (hasFailedNode) {
      return (
        <Trans
          i18nKey="maintenance.update.fixpack.rollbackModal.topMessage.failed"
          components={{ bold: <b className="font-semibold" /> }}
        />
      )
    }

    if (isRolledBack) {
      return t('maintenance.update.fixpack.rollbackModal.topMessage.completed')
    }

    return t('maintenance.update.fixpack.rollbackModal.topMessage.inProgress')
  }

  const statusWithIconPropsMap = useStatusWithIconPropsMap()

  const statusDisplay = useStatusDisplay()

  const renderProgressRowStatus = (
    status: GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current } = status

    if (current === ProgressStatus.RollingBack) {
      return (
        <div className="flex items-center gap-x-5 text-functional-text">
          <span className="primary-body4">
            {statusDisplay[ProgressStatus.RollingBack]}
          </span>
          <span className="primary-body5">{`${status.processPercent}%`}</span>
        </div>
      )
    }

    const statusWithIconProps = statusWithIconPropsMap[current]

    if (statusWithIconProps) {
      return <StatusWithIcon {...statusWithIconProps} />
    }

    return null
  }

  const renderFooter = () => {
    if (isRolledBack) return null

    if (showRebootHint) {
      return (
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="maintenance.update.fixpack.rollbackModal.bottomMessage.rebootHint"
            components={{ bold: <b className="font-semibold" /> }}
          />
        </div>
      )
    }

    return (
      <CosInlineNotification type="warning" isClosable={false}>
        {t(
          'maintenance.update.fixpack.rollbackModal.bottomMessage.resolveHint',
        )}
      </CosInlineNotification>
    )
  }

  return (
    <div className="flex flex-col gap-y-5">
      <div className="primary-body2 text-functional-text">
        {getDescription()}
      </div>
      <FixpackUpdateProgressTable
        isLoading={isLoading}
        rows={rows}
        renderStatus={renderProgressRowStatus}
        showContinueAnywayButton={(row) =>
          row.status.current === ProgressStatus.RollbackFailed
        }
      />
      {renderFooter()}
    </div>
  )
}
