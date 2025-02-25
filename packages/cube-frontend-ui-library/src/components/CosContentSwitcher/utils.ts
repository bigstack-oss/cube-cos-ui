import { createContext } from 'react'

export type ContentSwitcherSize = 'sm' | 'md'

export const CosContentSwitcherContext =
  createContext<ContentSwitcherSize>('md')
