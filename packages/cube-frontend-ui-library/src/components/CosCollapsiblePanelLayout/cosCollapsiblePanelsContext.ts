import { createContext } from 'react'

export type CosCollapsiblePanelsContextValue = {
  rightPanelWidth: string
  isOpen: boolean
  toggle: (open?: boolean) => void
  close: () => void
}

export const CosCollapsiblePanelsContext =
  createContext<CosCollapsiblePanelsContextValue>({
    rightPanelWidth: '',
    isOpen: true,
    toggle: () => {},
    close: () => {},
  })
