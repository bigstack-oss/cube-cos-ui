import { createContext } from 'react'
import { GetIntegratedApplicationsResponse } from '@cube-frontend/api'

type ApplicationIntegrationsContextValue = {
  applicationIntegrations: GetIntegratedApplicationsResponse['data']
  isLoading: boolean
}

export const ApplicationIntegrationsContext =
  createContext<ApplicationIntegrationsContextValue>({
    applicationIntegrations: [],
    isLoading: false,
  })
