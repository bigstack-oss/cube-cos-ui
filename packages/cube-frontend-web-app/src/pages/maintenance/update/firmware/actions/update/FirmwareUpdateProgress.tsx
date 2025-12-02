import { ReactNode, useMemo } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { upperFirst } from 'lodash'
import {
  GetFirmwareUpgradeProgressResponseDataProgressesInnerStatus,
  ListFirmwaresResponseDataFirmwaresInner,
  GetFirmwareUpgradeProgressResponseDataProgressesInnerPhaseEnum as ProgressPhase,
  GetFirmwareUpgradeProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus,
} from '@cube-frontend/api'
import { CosNagging, GetCosBasicTable } from '@cube-frontend/ui-library'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import {
  StatusWithIcon,
  StatusWithIconProps,
} from '../../../_components/StatusWithIcon'
import { updatedStatuses } from '../../computeFirmwaresActionState'
import { FirmwareContinueAnywayButton } from './FirmwareContinueAnywayButton'
import { FirmwareRetryButton } from './FirmwareRetryButton'
import { UpdateProgressRow } from './updateActionUtils'

type FirmwareUpdateProgressProps = {
  firmware: ListFirmwaresResponseDataFirmwaresInner
  isLoadingProgress: boolean
  progressRows: UpdateProgressRow[]
  isRollingApplied: boolean
  fetchUpdateProgress: () => Promise<unknown>
}

const useStatusTranslations = (): Record<ProgressStatus, string> => {
  const { t } = useTranslation()

  return {
    [ProgressStatus.Installing]: t(
      'maintenance.update.firmware.updateModal.status.updating',
    ),
    [ProgressStatus.Succeeded]: t(
      'maintenance.update.firmware.updateModal.status.succeeded',
    ),
    [ProgressStatus.WaitingReboot]: t(
      'maintenance.update.firmware.updateModal.status.pendingReboot',
    ),
    [ProgressStatus.Rebooting]: t(
      'maintenance.update.firmware.updateModal.status.rebooting',
    ),
    [ProgressStatus.Failed]: t(
      'maintenance.update.firmware.updateModal.status.failed',
    ),
    [ProgressStatus.Resolved]: t(
      'maintenance.update.firmware.updateModal.status.resolved',
    ),
  }
}

const useStatusWithIconPropsMap = (): Partial<
  Record<ProgressStatus, StatusWithIconProps>
> => {
  const statusTranslations = useStatusTranslations()

  return {
    [ProgressStatus.Succeeded]: {
      Icon: CheckmarkCircleFill,
      text: statusTranslations[ProgressStatus.Succeeded],
      color: 'text-status-positive',
    },
    [ProgressStatus.Failed]: {
      Icon: CrossFill,
      text: statusTranslations[ProgressStatus.Failed],
      color: 'text-status-negative',
    },
    [ProgressStatus.WaitingReboot]: {
      Icon: CircleFill,
      text: statusTranslations[ProgressStatus.WaitingReboot],
      color: 'text-status-neutral',
    },
    [ProgressStatus.Rebooting]: {
      Icon: CircleFill,
      text: statusTranslations[ProgressStatus.Rebooting],
      color: 'text-status-neutral',
    },
  }
}

const UpdateProgressTable = GetCosBasicTable<UpdateProgressRow>()

export const FirmwareUpdateProgress = (props: FirmwareUpdateProgressProps) => {
  const {
    firmware,
    isLoadingProgress,
    progressRows,
    isRollingApplied,
    fetchUpdateProgress,
  } = props

  const isUpdated = updatedStatuses.has(firmware.status.current)

  const hasResolvedProgress = useMemo<boolean>(
    () =>
      progressRows.some(
        (row) => row.status.current === ProgressStatus.Resolved,
      ),
    [progressRows],
  )

  const isReadyToManuallyReboot = useMemo<boolean>(
    () =>
      !isRollingApplied &&
      progressRows.length > 0 &&
      progressRows.every(
        (row) =>
          row.status.current === ProgressStatus.WaitingReboot ||
          row.status.current === ProgressStatus.Resolved,
      ),
    [isRollingApplied, progressRows],
  )

  const hasFailedProgress = useMemo<boolean>(
    () =>
      progressRows.some((row) => row.status.current === ProgressStatus.Failed),
    [progressRows],
  )

  const { t } = useTranslation()

  const renderTopMessage = () => {
    if (isUpdated) {
      if (hasResolvedProgress) {
        return (
          <div className="primary-body2 text-functional-text">
            <Trans
              i18nKey="maintenance.update.firmware.updateModal.topMessage.failed"
              values={{ firmware: firmware.version }}
              components={{ bold: <b className="font-semibold" /> }}
            />
          </div>
        )
      }

      return (
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="maintenance.update.firmware.updateModal.topMessage.completed"
            values={{ firmware: firmware.version }}
            components={{ bold: <b className="font-semibold" /> }}
          />
        </div>
      )
    }

    if (isReadyToManuallyReboot) {
      if (hasResolvedProgress) {
        return (
          <div className="primary-body2 text-functional-text">
            <Trans
              i18nKey="maintenance.update.firmware.updateModal.topMessage.failed"
              values={{ firmware: firmware.version }}
              components={{ bold: <b className="font-semibold" /> }}
            />
          </div>
        )
      }

      return (
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="maintenance.update.firmware.updateModal.topMessage.successful"
            values={{ firmware: firmware.version }}
            components={{ bold: <b className="font-semibold" /> }}
          />
        </div>
      )
    }

    if (hasFailedProgress) {
      return (
        <div className="primary-body2 text-functional-text">
          <Trans
            i18nKey="maintenance.update.firmware.updateModal.topMessage.failed"
            values={{ firmware: firmware.version }}
            components={{ bold: <b className="font-semibold" /> }}
          />{' '}
          <b className="font-semibold">
            {t(
              'maintenance.update.firmware.updateModal.topMessage.fixAndContinue',
            )}
          </b>
        </div>
      )
    }

    return (
      <div className="primary-body2 text-functional-text">
        <Trans
          i18nKey="maintenance.update.firmware.updateModal.topMessage.updating"
          values={{ firmware: firmware.version }}
          components={{ bold: <b className="font-semibold" /> }}
        />
      </div>
    )
  }

  const statusTranslations = useStatusTranslations()
  const statusWithIconPropsMap = useStatusWithIconPropsMap()

  const renderStatus = (
    status: GetFirmwareUpgradeProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current, processPercent } = status

    const statusWithIconProps = statusWithIconPropsMap[current]

    if (statusWithIconProps) {
      return <StatusWithIcon {...statusWithIconProps} />
    }

    const text =
      current === ProgressStatus.Installing
        ? statusTranslations[ProgressStatus.Installing]
        : statusTranslations[current]

    return (
      <div className="primary-body4 flex min-w-[120px] items-center gap-x-2.5 text-functional-text">
        <span>{text}</span>
        <span>{`${processPercent}%`}</span>
      </div>
    )
  }

  const renderPhaseAndDescription = (row: UpdateProgressRow) => {
    const {
      phase,
      status: { description },
    } = row

    let descriptionElement: ReactNode

    if (description) {
      descriptionElement = (
        <span className="primary-body4 break-all text-functional-text">
          {description}
        </span>
      )
    }

    return (
      <div className="flex items-center gap-x-5">
        <span className="secondary-body3 shrink-0 font-semibold text-primary">
          {/* We don't translate the phase enum since it actually is a dynamic string. The enum values we defined are not guaranteed and may be changed at any time. */}
          {upperFirst(phase)}
        </span>
        {descriptionElement}
      </div>
    )
  }

  const renderAction = (row: UpdateProgressRow) => {
    const {
      phase,
      status: { current },
    } = row

    if (current !== ProgressStatus.Failed) return null

    return (
      <div className="flex justify-end">
        {phase === ProgressPhase.Partitioning ? (
          <FirmwareRetryButton
            version={firmware.version}
            nodeName={row.host}
            onAccepted={fetchUpdateProgress}
          />
        ) : (
          <FirmwareContinueAnywayButton
            nodeName={row.host}
            onAccepted={fetchUpdateProgress}
          />
        )}
      </div>
    )
  }

  const renderBottomMessage = () => {
    if (isUpdated) return null

    if (isReadyToManuallyReboot) {
      return (
        <div className="primary-body2 font-semibold text-functional-text">
          {t(
            'maintenance.update.firmware.updateModal.bottomMessage.powerCycleToComplete',
          )}
        </div>
      )
    }

    if (isRollingApplied) {
      return (
        <div className="primary-body2 text-functional-text">
          {t(
            'maintenance.update.firmware.updateModal.bottomMessage.rollingApplied',
          )}
        </div>
      )
    }

    return null
  }

  return (
    <div className="flex flex-col gap-y-5">
      {renderTopMessage()}
      <UpdateProgressTable isLoading={isLoadingProgress} rows={progressRows}>
        <UpdateProgressTable.Column
          label={t('maintenance.update.firmware.updateModal.host')}
          property="host"
          fitContent={true}
        >
          {(host) => <div className="w-[150px]">{host}</div>}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column
          label={t('maintenance.update.firmware.updateModal.status')}
          property="status"
          fitContent={true}
        >
          {renderStatus}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column>
          {(_, row) => renderPhaseAndDescription(row)}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column>
          {(_, row) => renderAction(row)}
        </UpdateProgressTable.Column>
      </UpdateProgressTable>
      {renderBottomMessage()}
      {!isUpdated && (
        <CosNagging
          variant="top"
          type="warning"
          title={t(
            'maintenance.update.firmware.updateModal.bottomNagging.resolveToContinue',
          )}
          className="w-full"
          titleClassName="font-normal text-functional-text"
        />
      )}
    </div>
  )
}
