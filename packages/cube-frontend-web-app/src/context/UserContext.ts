import { createContext } from 'react'
import { GetMeResponseData } from '@cube-frontend/api'

type UserContextValue = {
  userInfo: GetMeResponseData | undefined
  isLoading: boolean
}

export const UserContext = createContext<UserContextValue>({
  userInfo: undefined,
  isLoading: false,
})
