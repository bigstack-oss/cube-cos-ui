import { PropsWithChildren, useContext, useMemo } from 'react'
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

  const contextValue = useMemo(() => {
    return {
      integrations,
      isLoading: isDataCenterLoading || isIntegrationsLoading,
    }
  }, [integrations, isDataCenterLoading, isIntegrationsLoading])

  return (
    <IntegrationsContext.Provider value={contextValue}>
      {children}
    </IntegrationsContext.Provider>
  )
}
