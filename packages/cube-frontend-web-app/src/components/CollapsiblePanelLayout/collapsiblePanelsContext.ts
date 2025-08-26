import { createContext } from 'react'

export type CollapsiblePanelsContextValue = {
  rightPanelWidth: string
  isOpen: boolean
  toggleOpen: (open?: boolean) => void
  close: () => void
}

export const CollapsiblePanelsContext =
  createContext<CollapsiblePanelsContextValue>({
    rightPanelWidth: '',
    isOpen: true,
    toggleOpen: () => {},
    close: () => {},
  })
