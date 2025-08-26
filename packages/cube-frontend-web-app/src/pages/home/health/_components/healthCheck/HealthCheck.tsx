import { HealthApiGetHealthsRequest } from '@cube-frontend/api'
import {
  CosButton,
  CosGeneralPanel,
  CosLoadingSpinner,
} from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useContext, useState } from 'react'
import { HOME_HEALTH_PAGE_POLLING_INTERVAL } from '../../homeHealthPageUtils'
import { HealthStatusBadge } from './HealthStatusBadge'
import { NgService } from './NgService'

export const HealthCheck = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { data: overallHealth, getResource: getHealths } = useCosGetRequest(
    healthApi.getHealths,
    () =>
      ({
        dataCenter: dataCenter!.name,
      }) satisfies HealthApiGetHealthsRequest,
  )

  const isLoadingHealth = !overallHealth

  const { startPolling, stopPolling } = usePolling(
    getHealths,
    HOME_HEALTH_PAGE_POLLING_INTERVAL,
  )

  // Use a separate loading state instead of `useCosMutationRequest`'s `isLoading`
  // to keep the Repair button in the loading state until the `getHealths` API
  // finishes after calling `repairHealth`.
  const [isCallingRepairApi, setIsCallingRepairApi] = useState(false)

  const { mutateResource: repairHealth } = useCosMutationRequest(
    healthApi.repairAllModulesHealth,
  )

  const renderNgServices = () => {
    const ngServices = overallHealth?.services.filter(
      (service) => service.status.current === 'ng',
    )

    if (!ngServices?.length) {
      return undefined
    }

    return (
      <div className="flex flex-col gap-y-2">
        {ngServices.map((service) => (
          <NgService key={service.name} service={service} />
        ))}
      </div>
    )
  }

  const onRepairClick = async () => {
    stopPolling()
    setIsCallingRepairApi(true)
    try {
      await repairHealth({ dataCenter: dataCenter!.name })
    } catch (error) {
      console.error('Repair data center health error: ', error)
    } finally {
      await getHealths()
      startPolling()
      setIsCallingRepairApi(false)
    }
  }

  const healthCheckStatus = isLoadingHealth ? (
    <CosLoadingSpinner variant="dot45" />
  ) : (
    <HealthStatusBadge status={overallHealth.overall.status.current} />
  )

  return (
    <CosGeneralPanel topic="Health Check:" leftSlot={healthCheckStatus}>
      <div className="flex flex-col gap-y-4">
        {renderNgServices()}
        <CosButton
          className="self-start"
          loading={overallHealth?.overall.status.isFixing || isCallingRepairApi}
          disabled={isLoadingHealth}
          onClick={onRepairClick}
        >
          Repair
        </CosButton>
      </div>
    </CosGeneralPanel>
  )
}
