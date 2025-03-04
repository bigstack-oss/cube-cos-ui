import { createContext } from 'react'

export type ContentSwitcherVariant = 'default' | 'radius'

export type ContentSwitcherSize = 'sm' | 'md'

export type CosContentSwitcherContextValue = {
  variant: ContentSwitcherVariant
  size?: ContentSwitcherSize
}

export const CosContentSwitcherContext =
  createContext<CosContentSwitcherContextValue>({
    variant: 'default',
    size: 'md',
  })
