import { createContext } from 'react'

export type CosBackButtonContextValue = {
  isLoading: boolean
}

export const CosBackButtonContext = createContext<CosBackButtonContextValue>({
  isLoading: false,
})
