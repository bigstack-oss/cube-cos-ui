import { createContext } from 'react'

export type UseFloatingExternalContextValue = {
  /**
   * CSS selector. E.g., `#my-container`, `.my-unique-class`, etc.
   * @default window
   */
  scrollableRootSelector?: string
}

export const UseFloatingExternalContext =
  createContext<UseFloatingExternalContextValue>({})
