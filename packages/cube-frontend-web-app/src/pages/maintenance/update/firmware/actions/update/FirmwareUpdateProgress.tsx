import {
  ListFirmwaresResponseDataFirmwaresInnerStatusCurrentEnum as FirmwareStatus,
  GetFirmwareUpgradeProgressResponseDataProgressesInnerStatus,
  ListFirmwaresResponseDataFirmwaresInner,
  GetFirmwareUpgradeProgressResponseDataProgressesInnerStatusCurrentEnum as ProgressStatus,
} from '@cube-frontend/api'
import { CosNagging, GetCosBasicTable } from '@cube-frontend/ui-library'
import CheckmarkCircleFill from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import { upperFirst } from 'lodash'
import { ReactNode, useMemo } from 'react'
import {
  StatusWithIcon,
  StatusWithIconProps,
} from '../../../_components/StatusWithIcon'
import { FirmwareContinueAnywayButton } from './FirmwareContinueAnywayButton'
import { UpdateProgressRow } from './updateActionUtils'

type FirmwareUpdateProgressProps = {
  firmware: ListFirmwaresResponseDataFirmwaresInner
  isLoadingProgress: boolean
  progressRows: UpdateProgressRow[]
  isRollingApplied: boolean
}

const UpdateProgressTable = GetCosBasicTable<UpdateProgressRow>()

const statusWithIconPropsMap: Partial<
  Record<ProgressStatus, StatusWithIconProps>
> = {
  [ProgressStatus.Succeeded]: {
    Icon: CheckmarkCircleFill,
    text: 'Succeeded',
    color: 'text-status-positive',
  },
  [ProgressStatus.Failed]: {
    Icon: CrossFill,
    text: 'Failed',
    color: 'text-status-negative',
  },
  [ProgressStatus.Resolved]: {
    Icon: CircleFill,
    text: 'Resolved',
    color: 'text-status-neutral',
  },
  [ProgressStatus.WaitingReboot]: {
    Icon: CircleFill,
    text: 'Pending reboot',
    color: 'text-status-neutral',
  },
  [ProgressStatus.Rebooting]: {
    Icon: CircleFill,
    text: 'Rebooting',
    color: 'text-status-neutral',
  },
}

export const FirmwareUpdateProgress = (props: FirmwareUpdateProgressProps) => {
  const { firmware, isLoadingProgress, progressRows, isRollingApplied } = props

  const isUpdated =
    firmware.status.current === FirmwareStatus.Resolved ||
    firmware.status.current === FirmwareStatus.Succeeded

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

  const renderTopMessage = () => {
    if (isUpdated) {
      if (hasResolvedProgress) {
        return (
          <div className="primary-body2 text-functional-text">
            Update of <b className="font-semibold">{firmware.version}</b> failed
            on some nodes.
          </div>
        )
      }

      return (
        <div className="primary-body2 text-functional-text">
          Update of <b className="font-semibold">{firmware.version}</b> has been
          completed.
        </div>
      )
    }

    if (isReadyToManuallyReboot) {
      if (hasResolvedProgress) {
        return (
          <div className="primary-body2 text-functional-text">
            Update of <b className="font-semibold">{firmware.version}</b> failed
            on some nodes.
          </div>
        )
      }

      return (
        <div className="primary-body2 text-functional-text">
          Update of <b className="font-semibold">{firmware.version}</b> was
          successful.
        </div>
      )
    }

    if (hasFailedProgress) {
      return (
        <div className="primary-body2 text-functional-text">
          Update of <b className="font-semibold">{firmware.version}</b> failed
          on some nodes.{' '}
          <b className="font-semibold">
            Fix the issue and try again before continuing.
          </b>
        </div>
      )
    }

    return (
      <div className="primary-body2 text-functional-text">
        Updating <b className="font-semibold">{firmware.version}</b> on the
        following nodes...
      </div>
    )
  }

  const renderStatus = (
    status: GetFirmwareUpgradeProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current, processPercent } = status

    const statusWithIconProps = statusWithIconPropsMap[current]

    if (statusWithIconProps) {
      return <StatusWithIcon {...statusWithIconProps} />
    }

    const text =
      current === ProgressStatus.Installing ? 'Updating' : upperFirst(current)

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
        <span className="primary-body4 text-functional-text">
          {description}
        </span>
      )
    }

    return (
      <div className="flex items-center gap-x-5">
        <span className="secondary-body3 font-semibold text-primary">
          {upperFirst(phase)}
        </span>
        {descriptionElement}
      </div>
    )
  }

  const renderAction = (row: UpdateProgressRow) => {
    const {
      status: { current },
    } = row

    if (current !== ProgressStatus.Failed) return null

    return (
      <div className="flex justify-end">
        <FirmwareContinueAnywayButton nodeName={row.host} />
      </div>
    )
  }

  const renderBottomMessage = () => {
    if (isUpdated) return null

    if (isReadyToManuallyReboot) {
      return (
        <div className="primary-body2 font-semibold text-functional-text">
          Please power cycle the cluster to complete the update.
        </div>
      )
    }

    if (isRollingApplied) {
      return (
        <div className="primary-body2 text-functional-text">
          Each node will be updated one by one. Running VMs will be
          automatically evacuated before update.
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
          label="Host"
          property="host"
          fitContent={true}
        >
          {(host) => <div className="w-[150px]">{host}</div>}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column
          label="Status"
          property="status"
          fitContent={true}
        >
          {renderStatus}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column>
          {(_, row) => renderPhaseAndDescription(row)}
        </UpdateProgressTable.Column>
        <UpdateProgressTable.Column fitContent={true}>
          {(_, row) => renderAction(row)}
        </UpdateProgressTable.Column>
      </UpdateProgressTable>
      {renderBottomMessage()}
      {!isUpdated && (
        <CosNagging
          variant="top"
          type="warning"
          title="If a node fails to update, please resolve the issue manually to
        continue."
          className="w-full"
          titleClassName="font-normal text-functional-text"
        />
      )}
    </div>
  )
}
