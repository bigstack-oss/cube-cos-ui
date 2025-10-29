import { PropsWithChildren, useContext, useMemo } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { ApplicationIntegrationsContext } from './ApplicationIntegrationsContext'
import { integrationsApi } from '../api/cosApi'
import { useCosGetRequest } from '../hooks/useCosRequest/useCosGetRequest'
import { IntegrationsApiGetIntegratedApplicationsRequest } from '@cube-frontend/api'

export const ApplicationIntegrationsContextProvider = (
  props: PropsWithChildren,
) => {
  const { children } = props

  const { dataCenter, isLoading: isDataCenterLoading } =
    useContext(DataCenterContext)

  const {
    data: applicationIntegrations = [],
    isLoading: isApplicationIntegrationsLoading,
  } = useCosGetRequest(integrationsApi.getIntegratedApplications, () => {
    if (!dataCenter) {
      return null
    }
    const req: IntegrationsApiGetIntegratedApplicationsRequest = {
      dataCenter: dataCenter.name,
    }
    return req
  })

  const contextValue = useMemo(() => {
    return {
      applicationIntegrations,
      isLoading: isDataCenterLoading || isApplicationIntegrationsLoading,
    }
  }, [
    applicationIntegrations,
    isDataCenterLoading,
    isApplicationIntegrationsLoading,
  ])

  return (
    <ApplicationIntegrationsContext.Provider value={contextValue}>
      {children}
    </ApplicationIntegrationsContext.Provider>
  )
}
