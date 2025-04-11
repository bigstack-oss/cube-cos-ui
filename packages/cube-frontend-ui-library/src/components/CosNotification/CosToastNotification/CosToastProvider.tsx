import { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { CosToastType, MAX_VISIBLE_TOASTS_AMOUNT } from './utils'
import { CosToastContext } from './context'
import { CosToastList } from './CosToastList'

export const CosToastProvider = (props: PropsWithChildren) => {
  const { children } = props

  const [toasts, setToasts] = useState<CosToastType[]>([])

  /**
   * Only expose add/remove in the context to avoid unnecessary re-renders
   */
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

  /**
   * Memorize context value with a stable reference
   */
  const contextValueRef = useRef({
    addToast,
    removeToast,
  })

  return (
    <CosToastContext.Provider value={contextValueRef.current}>
      {children}
      {createPortal(
        <CosToastList toasts={toasts} removeToast={removeToast} />,
        document.body,
      )}
    </CosToastContext.Provider>
  )
}
