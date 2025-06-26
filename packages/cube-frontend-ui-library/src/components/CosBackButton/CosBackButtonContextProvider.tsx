import { PropsWithChildren } from 'react'
import {
  CosBackButtonContext,
  CosBackButtonContextValue,
} from './cosBackButtonContext'

type CosBackButtonContextProviderProps =
  PropsWithChildren<CosBackButtonContextValue>

export const CosBackButtonContextProvider = (
  props: CosBackButtonContextProviderProps,
) => {
  const { children, ...contextValue } = props

  return (
    <CosBackButtonContext.Provider value={contextValue}>
      {children}
    </CosBackButtonContext.Provider>
  )
}
