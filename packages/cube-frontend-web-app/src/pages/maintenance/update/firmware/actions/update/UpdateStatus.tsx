import { GetFirmwareUpgradeProgressResponseDataProgressesInnerStatus as ProgressStatus } from '@cube-frontend/api'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import CrossFill from '@cube-frontend/ui-library/icons/monochrome/cross_fill.svg?react'
import { upperFirst } from 'lodash'

type UpdateStatusProps = {
  status: ProgressStatus
}

export const UpdateStatus = (props: UpdateStatusProps) => {
  const { status } = props

  const isOngoingStatus =
    status.current === 'installing' || status.current === 'waitingReboot'

  if (status.current === 'available')
    return (
      <div className="flex items-center gap-x-2 text-status-positive">
        <CircleFill className="icon-md" />
        <span>Succeeded</span>
      </div>
    )

  if (status.current === 'failed')
    return (
      <div className="flex items-center gap-x-2 text-status-negative">
        <CrossFill className="icon-md" />
        <span>Failed</span>
      </div>
    )

  if (status.current === 'resolved')
    return (
      <div className="flex items-center gap-x-2 text-status-neutral">
        <div className="size-[14px] rounded-full bg-status-neutral" />
        <span>Resolved</span>
      </div>
    )

  return (
    <div className="flex items-center gap-x-5">
      <div>{upperFirst(status.current)}</div>
      {isOngoingStatus && <div>{status.processPercent}%</div>}
    </div>
  )
}
