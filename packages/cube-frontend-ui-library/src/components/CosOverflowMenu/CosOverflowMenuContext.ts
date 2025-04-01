import { createContext } from 'react'

type CosOverflowMenuContextValue = () => void

export const CosOverflowMenuContext =
  createContext<CosOverflowMenuContextValue>(() => undefined)
