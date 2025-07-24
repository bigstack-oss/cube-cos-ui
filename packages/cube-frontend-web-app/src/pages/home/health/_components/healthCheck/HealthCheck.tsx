import { HealthApiGetHealthsRequest } from '@cube-frontend/api'
import { CosButton, CosLoadingSpinner } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useSequentialInterval } from '@cube-frontend/web-app/hooks/useSequentialInterval/useSequentialInterval'
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

  const { startInterval, stopInterval } = useSequentialInterval(
    getHealths,
    HOME_HEALTH_PAGE_POLLING_INTERVAL,
    {
      immediate: false,
    },
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
    stopInterval()
    setIsCallingRepairApi(true)
    try {
      await repairHealth({ dataCenter: dataCenter!.name })
    } catch (error) {
      console.error('Repair data center health error: ', error)
    } finally {
      await getHealths()
      startInterval()
      setIsCallingRepairApi(false)
    }
  }

  return (
    <div className="flex flex-col gap-y-4 rounded-[5px] bg-grey-0 px-8 py-6 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
      <div className="flex items-center gap-x-2">
        <h5 className="secondary-h5">Health Check:</h5>
        {isLoadingHealth ? (
          <CosLoadingSpinner variant="dot45" />
        ) : (
          <HealthStatusBadge status={overallHealth.overall.status.current} />
        )}
      </div>
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
  )
}
