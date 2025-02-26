import { PropsWithChildren } from 'react'
import {
  UseFloatingExternalContext,
  UseFloatingExternalContextValue,
} from './externalContext'

export const UseFloatingExternalContextProvider = (
  props: PropsWithChildren<UseFloatingExternalContextValue>,
) => {
  const { children, scrollableRootSelector } = props

  return (
    <UseFloatingExternalContext.Provider value={{ scrollableRootSelector }}>
      {children}
    </UseFloatingExternalContext.Provider>
  )
}
