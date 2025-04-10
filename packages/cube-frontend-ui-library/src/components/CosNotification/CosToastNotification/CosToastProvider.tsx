import { PropsWithChildren, useCallback, useState } from 'react'
import { CosToastType, MAX_VISIBLE_TOASTS_AMOUNT } from './utils'
import { CosToastContext } from './context'

type ToastProviderProps = PropsWithChildren

export const CosToastProvider = (props: ToastProviderProps) => {
  const { children } = props

  const [toasts, setToasts] = useState<CosToastType[]>([])

  const addToast = useCallback((toast: CosToastType) => {
    setToasts((prevToasts) => {
      const next = [...prevToasts, toast]
      if (next.length > MAX_VISIBLE_TOASTS_AMOUNT) {
        next.shift()
      }
      return next
    })
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  return (
    <CosToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
    </CosToastContext.Provider>
  )
}
