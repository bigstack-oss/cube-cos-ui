import { useCallback, useState } from 'react'

export type UseOpenState = {
  isOpen: boolean
  toggle: () => void
  open: () => void
  close: () => void
}

export const useOpenState = (defaultValue = false): UseOpenState => {
  const [isOpen, setIsOpen] = useState(defaultValue)

  const toggle = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return {
    isOpen,
    toggle,
    open,
    close,
  }
}
