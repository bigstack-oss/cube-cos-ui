import { createContext } from 'react'
import { GetIntegrationsResponse } from '@cube-frontend/api'

type IntegrationsContextValue = {
  integrations: GetIntegrationsResponse['data']
  isLoading: boolean
}

export const IntegrationsContext = createContext<IntegrationsContextValue>({
  integrations: [],
  isLoading: false,
})
