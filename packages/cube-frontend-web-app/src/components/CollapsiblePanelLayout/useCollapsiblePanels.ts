import { useOpenState } from '@cube-frontend/web-app/hooks/useOpenState/useOpenState'
import { useCallback } from 'react'

type UseCollapsiblePanelsOptions = {
  defaultPanelOpen?: boolean
  isControlledPanelOpen?: boolean
  onControlledPanelOpenChange?: (open: boolean) => void
}

type UseCollapsiblePanels = {
  isOpen: boolean
  toggleOpen: (open?: boolean) => void
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

  const {
    isOpen: internalOpen,
    open: onOpenInternal,
    close: onCloseInternal,
  } = useOpenState(defaultPanelOpen)

  const isControlled = isControlledPanelOpen !== undefined

  const isOpen = isControlled ? isControlledPanelOpen : internalOpen

  const toggleOpen = useCallback(
    (open?: boolean) => {
      const next = open ?? !isOpen

      if (!isControlled) {
        if (next) {
          onOpenInternal()
        } else {
          onCloseInternal()
        }
      }
      if (isControlled) {
        onControlledPanelOpenChange?.(next)
      }
    },
    [
      isOpen,
      isControlled,
      onOpenInternal,
      onCloseInternal,
      onControlledPanelOpenChange,
    ],
  )

  const close = () => toggleOpen(false)

  return {
    isOpen,
    toggleOpen,
    close,
  }
}
