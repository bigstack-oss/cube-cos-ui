import { PropsWithChildren, useMemo } from 'react'
import {
  UseFloatingExternalContext,
  UseFloatingExternalContextValue,
} from './externalContext'

export const UseFloatingExternalContextProvider = (
  props: PropsWithChildren<UseFloatingExternalContextValue>,
) => {
  const { children, scrollableRootSelector } = props

  const contextValue = useMemo(() => {
    return {
      scrollableRootSelector,
    }
  }, [scrollableRootSelector])

  return (
    <UseFloatingExternalContext.Provider value={contextValue}>
      {children}
    </UseFloatingExternalContext.Provider>
  )
}
