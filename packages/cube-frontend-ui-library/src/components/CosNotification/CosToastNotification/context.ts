import { createContext } from 'react'
import { CosToastType } from './utils'

export type CosToastContextValue = {
  toasts: CosToastType[]
  addToast: (toast: CosToastType) => void
  removeToast: (id: string) => void
}

export const CosToastContext = createContext<CosToastContextValue>({
  toasts: [],
  addToast: () => {},
  removeToast: () => {},
})
