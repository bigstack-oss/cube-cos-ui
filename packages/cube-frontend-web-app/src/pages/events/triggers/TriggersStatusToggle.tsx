import { useState } from 'react'
import { CosToggle } from '@cube-frontend/ui-library'
import { TriggerRow } from './triggersUtils'

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

  const [isOn, setIsOn] = useState(!!enabled)

  const handleToggleChange = () => {
    onChange(name)
    setIsOn(!row?.enabled)
  }

  return (
    <CosToggle
      isOn={isOn}
      onChange={handleToggleChange}
      disabled={isUpdating}
    />
  )
}
