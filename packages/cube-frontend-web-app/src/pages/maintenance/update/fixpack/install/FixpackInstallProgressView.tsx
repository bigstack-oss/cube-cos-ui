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
import { ProgressTableRow } from '../_components/fixpackUpdateUtils'

type FixpackInstallProgressViewProps = {
  isLoading: boolean
  fixpack: ListFixpacksResponseDataFixpacksInner
  rows: ProgressTableRow[]
}

const statusWithIconPropsMap: Partial<
  Record<ProgressStatus, StatusWithIconProps>
> = {
  [ProgressStatus.Installed]: {
    Icon: CheckmarkCircleFill,
    text: 'Succeeded',
    color: 'text-status-positive',
  },
  [ProgressStatus.InstallFailed]: {
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

    if (isInstalled) {
      return 'Installation completed. Please check the status of each node.'
    }

    return 'Install in progress for the following nodes:'
  }

  const renderProgressRowStatus = (
    status: GetFixpackUpdateProgressResponseDataProgressesInnerStatus,
  ) => {
    const { current } = status

    if (current === ProgressStatus.Installing) {
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
    if (isInstalled) return null

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
      />
      {renderFooter()}
    </div>
  )
}
