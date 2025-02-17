import { PropsWithChildren, useContext, useEffect, useState } from 'react'
import { DataCenterContext } from './DataCenterContext'
import { GetIntegrationsResponse } from '@cube-frontend/api'
import { IntegrationsContext } from './IntegrationsContext'
import { integrationsApi } from '../api/cosApi'

export const IntegrationsContextProvider = (props: PropsWithChildren) => {
  const { children } = props

  const [isLoading, setIsLoading] = useState(true)
  const [integrations, setIntegrations] =
    useState<GetIntegrationsResponse['data']>()

  const dataCenter = useContext(DataCenterContext)

  useEffect(() => {
    integrationsApi
      .getIntegrations(dataCenter.name)
      .then((dataCentersResponse) => {
        setIntegrations(dataCentersResponse.data.data)
        setIsLoading(false)
      })
  }, [dataCenter.name])

  if (isLoading || !integrations) {
    return null
  }

  return (
    <IntegrationsContext.Provider value={integrations}>
      {children}
    </IntegrationsContext.Provider>
  )
}
