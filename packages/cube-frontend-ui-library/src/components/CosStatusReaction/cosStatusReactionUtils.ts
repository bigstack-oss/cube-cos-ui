import { ValueOfSet } from '@cube-frontend/utils'

// TODO: Align these values with the backend status constants.
const neutralStatuses = new Set(['neutral'] as const)
const successStatuses = new Set(['success', 'available', 'done'] as const)
const warningStatuses = new Set(['error', 'duplicate', 'failed'] as const)

type NeutralStatus = ValueOfSet<typeof neutralStatuses>
type SuccessStatus = ValueOfSet<typeof successStatuses>
type WarningStatus = ValueOfSet<typeof warningStatuses>

export type Status = NeutralStatus | SuccessStatus | WarningStatus

export type StatusType = 'neutral' | 'success' | 'warning'

export const computeStatusType = (status: string): StatusType => {
  if (neutralStatuses.has(status as NeutralStatus)) {
    return 'neutral'
  } else if (successStatuses.has(status as SuccessStatus)) {
    return 'success'
  } else if (warningStatuses.has(status as WarningStatus)) {
    return 'warning'
  }
  throw new Error(`Status ${status} is not defined in CosStatusReaction`)
}

export const baseClass = 'inline-flex w-fit items-center gap-x-2 px-2 py-[5px]'
