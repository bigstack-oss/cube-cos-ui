import { uniqueId } from 'lodash'
import { GetTriggersResponseDataInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type TriggerRow = GetTriggersResponseDataInner &
  CosTableRow & {
    isResetting?: boolean
  }

const getRowId = (): string => uniqueId('trigger')

export const mapToTriggerTableRows = (
  triggers: GetTriggersResponseDataInner[],
): TriggerRow[] =>
  triggers.map((trigger) => ({
    ...trigger,
    id: getRowId(),
    isResetting: false,
  }))

export const getTriggerResponse = (res: string[]): string => {
  const hasSlack = res.includes('slack')
  const hasEmail = res.includes('email')

  if (hasSlack && hasEmail) return 'Slack / Emails'
  if (hasSlack) return 'Slack'
  if (hasEmail) return 'Emails'

  return ''
}
