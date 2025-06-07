import { GetTriggersResponseDataInner } from '@cube-frontend/api'
import { CosTableRow } from '@cube-frontend/ui-library'

export type TriggerRow = GetTriggersResponseDataInner & CosTableRow

export const mapToTriggerTableRow = (
  trigger: GetTriggersResponseDataInner,
): TriggerRow => ({
  ...trigger,
  /**
   * We use the trigger name as the row ID since it is unique.
   * This is a workaround for the fact that the API does not return an ID field.
   */
  id: trigger.name,
})

export const getTriggerResponse = (res: string[]): string => {
  const hasSlack = res.includes('slack')
  const hasEmail = res.includes('email')

  if (hasSlack && hasEmail) return 'Slack / Emails'
  if (hasSlack) return 'Slack'
  if (hasEmail) return 'Emails'

  return 'None'
}
