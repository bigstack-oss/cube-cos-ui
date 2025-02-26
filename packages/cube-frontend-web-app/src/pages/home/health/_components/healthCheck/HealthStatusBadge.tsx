import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { HealthStatus } from '../../homeHealthUtils'

export type HealthStatusBadgeProps = {
  status: AvailableStatus
}

export type AvailableStatus = Exclude<HealthStatus, 'blank'>

const badge = cva(
  [
    'h-[19px] w-[31px] rounded px-1.5 py-0.5',
    'primary-body4 text-center font-extrabold text-grey-0',
  ],
  {
    variants: {
      status: {
        ok: 'bg-status-positive',
        ng: 'bg-status-negative',
      } satisfies Record<AvailableStatus, ClassValue>,
    },
  },
)

export const HealthStatusBadge = (props: HealthStatusBadgeProps) => {
  const { status } = props

  return (
    <span
      className={badge({
        status,
      })}
    >
      {status.toUpperCase()}
    </span>
  )
}
