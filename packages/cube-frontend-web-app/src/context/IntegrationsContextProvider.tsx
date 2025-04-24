import { PropsWithChildren, useContext } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { IntegrationsContext } from './IntegrationsContext'
import { integrationsApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { IntegrationsApiGetIntegrationsRequest } from '@cube-frontend/api'

export const IntegrationsContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const { data: integrations = [], isLoading: isIntegrationsLoading } =
    useCosGetRequest(integrationsApi.getIntegrations, () => {
      if (!dataCenter) {
        return null
      }
      const req: IntegrationsApiGetIntegrationsRequest = {
        dataCenter: dataCenter.name,
      }
      return req
    })

  return (
    <IntegrationsContext.Provider
      value={{
        integrations,
        isLoading: isDataCenterLoading || isIntegrationsLoading,
      }}
    >
      {children}
    </IntegrationsContext.Provider>
  )
}
