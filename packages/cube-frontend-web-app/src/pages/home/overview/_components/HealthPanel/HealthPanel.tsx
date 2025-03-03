import { useContext, useMemo } from 'react'
import {
  HealthApiGetHealthsRequest,
  HealthApiRepairAllModulesHealthRequest,
} from '@cube-frontend/api'
import { CosPanel } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { HealthError } from './HealthError'
import { HealthStatus } from './HealthStatus/HealthStatus'
import { toHealthUIData } from './utils'
import { links } from '../../../links'

const HealthPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const { data: healths, isLoading } = useCosStreamRequest(
    healthApi.getHealths,
    () => {
      if (!dataCenter.name) return

      return {
        dataCenter: dataCenter.name,
      } satisfies HealthApiGetHealthsRequest
    },
  )

  const updateTime = useUpdateTime(healths, isLoading)
  const { errorCount, errorServices, categories } = useMemo(
    () => toHealthUIData(healths),
    [healths],
  )

  const { isLoading: isCallingRepairApi, mutateResource: repairHealth } =
    useCosMutationRequest(
      healthApi.repairAllModulesHealth as (
        params: HealthApiRepairAllModulesHealthRequest,
      ) => Promise<CosApiResponse<undefined>>,
    )

  const handleRepair = async () => {
    try {
      await repairHealth({
        dataCenter: dataCenter.name,
      })
    } catch (error) {
      console.error('Repair data center health error: ', error)
    }
  }

  const isRepairButtonLoading =
    healths?.overall.status.isFixing || isCallingRepairApi

  return (
    <CosPanel
      title="Health"
      time={updateTime}
      errorCount={errorCount}
      hyperLinkProps={{ href: links.health }}
      isTimeLoading={isLoading}
    >
      <HealthError
        isLoading={isLoading}
        errorServices={errorServices}
        onRepair={handleRepair}
        isRepairButtonLoading={isRepairButtonLoading}
      />
      <HealthStatus isLoading={isLoading} categories={categories} />
    </CosPanel>
  )
}

export default HealthPanel
