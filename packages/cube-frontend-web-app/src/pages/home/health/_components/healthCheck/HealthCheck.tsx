import {
  HealthApiGetHealthsRequest,
  HealthApiRepairAllModulesHealthRequest,
} from '@cube-frontend/api'
import { CosButton, CosLoadingSpinner } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { useContext } from 'react'
import { AvailableStatus, HealthStatusBadge } from './HealthStatusBadge'
import { NgService } from './NgService'

export const HealthCheck = () => {
  const dataCenter = useContext(DataCenterContext)

  const { isLoading: isLoadingHealth, data: overallHealth } =
    useCosStreamRequest(
      healthApi.getHealths,
      () =>
        ({
          dataCenter: dataCenter.name,
        }) satisfies HealthApiGetHealthsRequest,
    )

  const { isLoading: isCallingRepairApi, mutateResource: repairHealth } =
    useCosMutationRequest(
      healthApi.repairAllModulesHealth as (
        params: HealthApiRepairAllModulesHealthRequest,
      ) => Promise<CosApiResponse<undefined>>,
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
    try {
      await repairHealth({ dataCenter: dataCenter.name })
    } catch (error) {
      console.error('Repair data center health error: ', error)
    }
  }

  const isRepairButtonLoading =
    overallHealth?.overall.status.isFixing || isCallingRepairApi

  return (
    <div className="flex flex-col gap-y-4 rounded-[5px] bg-grey-0 px-8 py-6 shadow-[0px_0px_3px_0px_rgba(0,_0,_0,_0.10)]">
      <div className="flex items-center gap-x-2">
        <h5 className="secondary-h5">Health Check:</h5>
        {!overallHealth || isLoadingHealth ? (
          <CosLoadingSpinner variant="dot45" />
        ) : (
          <HealthStatusBadge
            status={overallHealth.overall.status.current as AvailableStatus}
          />
        )}
      </div>
      {renderNgServices()}
      <CosButton
        className="self-start"
        loading={isRepairButtonLoading}
        disabled={isLoadingHealth}
        onClick={onRepairClick}
      >
        Repair
      </CosButton>
    </div>
  )
}
