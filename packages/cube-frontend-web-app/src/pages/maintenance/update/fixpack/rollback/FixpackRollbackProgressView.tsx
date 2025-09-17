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
import { upperFirst } from 'lodash'
import { useMemo } from 'react'
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

const statusWithIconPropsMap: Partial<
  Record<ProgressStatus, StatusWithIconProps>
> = {
  [ProgressStatus.Available]: {
    Icon: CheckmarkCircleFill,
    text: 'Succeeded',
    color: 'text-status-positive',
  },
  [ProgressStatus.RollbackFailed]: {
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
    color: 'text-status-positive',
  },
  [ProgressStatus.Rebooting]: {
    Icon: CircleFill,
    text: 'Rebooting',
    color: 'text-status-positive',
  },
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

  const getDescription = () => {
    if (hasFailedNode) {
      return (
        <>
          Failed on some nodes.{' '}
          <b className="font-semibold">
            Fix the issue and try again before continuing.
          </b>
        </>
      )
    }

    if (isRolledBack) {
      return 'Rolling back completed. Please check the status of each node.'
    }

    return 'Rollback in progress for the following nodes:'
  }

  const renderProgressRowStatus = (
    status: GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current } = status

    if (current === ProgressStatus.RollingBack) {
      return (
        <div className="flex items-center gap-x-5 text-functional-text">
          <span className="primary-body4">{upperFirst(status.current)}</span>
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
          After updating,{' '}
          <b className="font-semibold">
            A reboot is required to complete the update.
          </b>
        </div>
      )
    }

    return (
      <CosInlineNotification type="warning" isClosable={false}>
        If a node fails to update, please resolve the issue manually to
        continue.
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
