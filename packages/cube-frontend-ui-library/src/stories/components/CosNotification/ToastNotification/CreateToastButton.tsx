import { useState } from 'react'
import { CosButton } from '../../../../components/CosButton/CosButton'
import { useToast } from '../../../../components/CosNotification/CosToastNotification/useToast'
import { mockToasts } from './mockData'

export const CreateToastButton = () => {
  const { addToast } = useToast()

  const [activeToast, setActiveToast] = useState(0)

  const handleAddToast = () => {
    addToast(mockToasts[activeToast])
    if (activeToast === mockToasts.length - 1) {
      setActiveToast(0)
    } else {
      setActiveToast(activeToast + 1)
    }
  }

  return (
    <CosButton type="primary" usage="text-only" onClick={handleAddToast}>
      Create Toast
    </CosButton>
  )
}
