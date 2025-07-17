import { CosToggle } from '@cube-frontend/ui-library'
import { TriggerRow } from '../utils'

type TriggersStatusToggleProps = {
  row: TriggerRow
  onChange: (triggerName: string) => Promise<void>
}

export const TriggersStatusToggle = (props: TriggersStatusToggleProps) => {
  const { row, onChange } = props

  const {
    name,
    response: { types },
    enabled,
    isProcessing,
  } = row

  /**
   * Prevents user interaction with the status toggle when:
   * 1. The trigger has just been created, edited, or deleted
   * 2. Until the trigger's `response` field has been successfully set
   */
  const isDisabled = isProcessing || types.length === 0

  return (
    <CosToggle
      isOn={!!enabled}
      onChange={() => onChange(name)}
      disabled={isDisabled}
    />
  )
}
