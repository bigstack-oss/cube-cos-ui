import { useState } from 'react'
import { CosToggle } from '@cube-frontend/ui-library'

type TriggersStatusToggleProps = {
  isLoading: boolean
  triggerName: string
  isOn: boolean
  onChange: (triggerName: string, enabled: boolean) => Promise<void>
}

export const TriggersStatusToggle = (props: TriggersStatusToggleProps) => {
  const { isLoading, triggerName, isOn: isOnProps, onChange } = props

  const [isOn, setIsOn] = useState(isOnProps)

  const handleToggleOn = () => {
    onChange(triggerName, isOn)
    setIsOn((prev) => !prev)
  }

  return (
    <CosToggle isOn={isOn} onChange={handleToggleOn} disabled={isLoading} />
  )
}
