import { useState } from 'react'
import { DeviceRow } from './nodeDevicesUtils'

type UseDeviceActionModal = {
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onOpen: (targetRow: DeviceRow) => void
  onClose: () => void
}

export const useDeviceActionModal = (): UseDeviceActionModal => {
  const [isOpen, setIsOpen] = useState(false)
  const [targetRow, setTargetRow] = useState<DeviceRow | undefined>(undefined)

  const onOpen = (targetRow: DeviceRow): void => {
    setIsOpen(true)
    setTargetRow(targetRow)
  }

  const onClose = (): void => {
    setIsOpen(false)
    setTargetRow(undefined)
  }

  return {
    isOpen,
    targetRow,
    onOpen,
    onClose,
  }
}
