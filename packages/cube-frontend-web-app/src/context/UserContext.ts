import { GetMeResponseData } from '@cube-frontend/api'
import { createContext } from 'react'

export const UserContext = createContext(null as unknown as GetMeResponseData)
