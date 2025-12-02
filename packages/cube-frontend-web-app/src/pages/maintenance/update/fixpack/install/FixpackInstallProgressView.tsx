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
import { ProgressTableRow } from '../_components/fixpackUpdateUtils'

type FixpackInstallProgressViewProps = {
  isLoading: boolean
  fixpack: ListFixpacksResponseDataFixpacksInner
  rows: ProgressTableRow[]
}

const useStatusDisplay = () => {
  const { t } = useTranslation()

  return {
    [ProgressStatus.Installed]: t(
      'maintenance.update.fixpack.installModal.status.succeeded',
    ),
    [ProgressStatus.Installing]: t(
      'maintenance.update.fixpack.installModal.status.updating',
    ),
    [ProgressStatus.InstallFailed]: t(
      'maintenance.update.fixpack.installModal.status.failed',
    ),
    [ProgressStatus.Resolved]: t(
      'maintenance.update.fixpack.installModal.status.resolved',
    ),
    [ProgressStatus.WaitingReboot]: t(
      'maintenance.update.fixpack.installModal.status.pendingReboot',
    ),
    [ProgressStatus.Rebooting]: t(
      'maintenance.update.fixpack.installModal.status.rebooting',
    ),
  } as const
}

const useStatusWithIconPropsMap = (): Partial<
  Record<ProgressStatus, StatusWithIconProps>
> => {
  const statusTranslations = useStatusDisplay()

  return {
    [ProgressStatus.Installed]: {
      Icon: CheckmarkCircleFill,
      text: statusTranslations[ProgressStatus.Installed],
      color: 'text-status-positive',
    },
    [ProgressStatus.InstallFailed]: {
      Icon: CrossFill,
      text: statusTranslations[ProgressStatus.InstallFailed],
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

export const FixpackInstallProgressView = (
  props: FixpackInstallProgressViewProps,
) => {
  const { isLoading, fixpack, rows } = props

  const isInstalled = fixpack.status.current === FixpackStatus.Installed

  const hasFailedNode = useMemo<boolean>(() => {
    return rows.some(
      (row) => row.status.current === ProgressStatus.InstallFailed,
    )
  }, [rows])

  const showRebootHint = useMemo<boolean>(() => {
    return (
      fixpack.rebootRequired &&
      rows.some(
        (row) =>
          row.status.current === ProgressStatus.WaitingReboot ||
          row.status.current === ProgressStatus.Rebooting,
      )
    )
  }, [fixpack.rebootRequired, rows])

  const { t } = useTranslation()

  const getDescription = () => {
    if (hasFailedNode) {
      return (
        <Trans
          i18nKey="maintenance.update.fixpack.installModal.topMessage.failed"
          components={{ bold: <b className="font-semibold" /> }}
        />
      )
    }

    if (isInstalled) {
      return t('maintenance.update.fixpack.installModal.topMessage.completed')
    }

    return t('maintenance.update.fixpack.installModal.topMessage.inProgress')
  }

  const statusWithIconPropsMap = useStatusWithIconPropsMap()

  const statusDisplay = useStatusDisplay()

  const renderProgressRowStatus = (
    status: GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current } = status

    if (current === ProgressStatus.Installing) {
      return (
        <div className="flex items-center gap-x-5 text-functional-text">
          <span className="primary-body4">{statusDisplay.installing}</span>
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
    if (isInstalled) return null

    if (showRebootHint) {
      return (
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="maintenance.update.fixpack.installModal.bottomMessage.rebootHint"
            components={{ bold: <b className="font-semibold" /> }}
          />
        </div>
      )
    }

    return (
      <CosInlineNotification type="warning" isClosable={false}>
        {t('maintenance.update.fixpack.installModal.bottomMessage.resolveHint')}
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
          row.status.current === ProgressStatus.InstallFailed
        }
      />
      {renderFooter()}
    </div>
  )
}
