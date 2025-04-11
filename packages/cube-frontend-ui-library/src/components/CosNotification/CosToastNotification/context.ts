import { createContext } from 'react'
import { CosToastType } from './utils'

export type CosToastContextValue = {
  addToast: (toast: CosToastType) => void
  removeToast: (id: string) => void
}

export const CosToastContext = createContext<CosToastContextValue>({
  addToast: () => {},
  removeToast: () => {},
})
