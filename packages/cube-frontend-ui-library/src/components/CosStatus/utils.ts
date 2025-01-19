import { ValueOfSet } from '@cube-frontend/utils'

// TODO: Align these values with the backend status constants.
const neutralStatuses = new Set(['neutral', 'in-use', 'finished'] as const)
const successStatuses = new Set(['success', 'active', 'available'] as const)
const warningStatuses = new Set([
  'warning',
  'error',
  'failed',
  'stopped',
] as const)

type NeutralStatus = ValueOfSet<typeof neutralStatuses>
type SuccessStatus = ValueOfSet<typeof successStatuses>
type WarningStatus = ValueOfSet<typeof warningStatuses>

export type Status =
  // Use `string & {}` with custom types to allow string literals or any string.
  // Reference: https://stackoverflow.com/a/61048124/19772349
  (string & {}) | NeutralStatus | SuccessStatus | WarningStatus

export type StatusType = 'neutral' | 'success' | 'warning' | 'others'

export const computeStatusType = (status: string): StatusType => {
  if (neutralStatuses.has(status as NeutralStatus)) {
    return 'neutral'
  } else if (successStatuses.has(status as SuccessStatus)) {
    return 'success'
  } else if (warningStatuses.has(status as WarningStatus)) {
    return 'warning'
  }
  return 'others'
}
