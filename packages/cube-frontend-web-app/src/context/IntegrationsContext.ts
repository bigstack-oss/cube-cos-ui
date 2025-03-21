import { GetIntegrationsResponse } from '@cube-frontend/api'
import { createContext } from 'react'

export const IntegrationsContext = createContext<
  GetIntegrationsResponse['data']
>([])
