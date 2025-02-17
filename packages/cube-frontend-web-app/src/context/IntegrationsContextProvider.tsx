import { PropsWithChildren, useContext } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { IntegrationsContext } from './IntegrationsContext'
import { integrationsApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { IntegrationsApiGetIntegrationsRequest } from '@cube-frontend/api'

export const IntegrationsContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const dataCenter = useContext(DataCenterContext)

  const { data: integrations, isLoading } = useCosGetRequest(
    integrationsApi.getIntegrations,
    () => {
      if (!dataCenter.name) return null
      const req: IntegrationsApiGetIntegrationsRequest = {
        dataCenter: dataCenter.name,
      }
      return req
    },
  )

  if (isLoading || !integrations) {
    return null
  }

  return (
    <IntegrationsContext.Provider value={integrations}>
      {children}
    </IntegrationsContext.Provider>
  )
}
