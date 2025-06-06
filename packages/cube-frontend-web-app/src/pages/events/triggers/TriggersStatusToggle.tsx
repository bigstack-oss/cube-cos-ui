import { CosToggle } from '@cube-frontend/ui-library'
import { TriggerRow } from './utils'

type TriggersStatusToggleProps = {
  row: TriggerRow
  onChange: (triggerName: string) => Promise<void>
}

export const TriggersStatusToggle = (props: TriggersStatusToggleProps) => {
  const { row, onChange } = props

  const {
    name,
    enabled,
    status: { isUpdating },
  } = row

  const handleToggleChange = () => {
    onChange(name)
  }

  return (
    <CosToggle
      isOn={!!enabled}
      onChange={handleToggleChange}
      disabled={isUpdating}
    />
  )
}
