import { useCallback, useState } from 'react'

type UseCollapsiblePanelsOptions = {
  defaultPanelOpen: boolean
  isControlledPanelOpen?: boolean
  onControlledPanelOpenChange?: (open: boolean) => void
}

type UseCollapsiblePanels = {
  isOpen: boolean
  toggle: (open?: boolean) => void
  close: () => void
}

export const useCollapsiblePanels = (
  options: UseCollapsiblePanelsOptions,
): UseCollapsiblePanels => {
  const {
    defaultPanelOpen,
    isControlledPanelOpen,
    onControlledPanelOpenChange,
  } = options

  const [isInternalOpen, setIsInternalOpen] = useState(defaultPanelOpen)

  const isControlled = isControlledPanelOpen !== undefined

  const isOpen = isControlled ? isControlledPanelOpen : isInternalOpen

  const toggle = useCallback(
    (open?: boolean) => {
      const next = open ?? !isOpen

      if (isControlled) {
        onControlledPanelOpenChange?.(next)
      } else {
        setIsInternalOpen(next)
      }
    },
    [isOpen, isControlled, onControlledPanelOpenChange],
  )

  const close = () => toggle(false)

  return {
    isOpen,
    toggle,
    close,
  }
}
