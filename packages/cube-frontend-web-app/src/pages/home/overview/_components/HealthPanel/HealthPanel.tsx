import { useContext, useMemo } from 'react'
import {
  HealthApiGetHealthsRequest,
  HealthApiRepairAllModulesHealthRequest,
} from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { HealthError } from './HealthError'
import { HealthStatus } from './HealthStatus/HealthStatus'
import { toHealthUIData } from './utils'
import { links } from '../../../links'
import { useInterval } from '@cube-frontend/web-app/hooks/useInterval'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'

const HealthPanel = () => {
  const dataCenter = useContext(DataCenterContext)

  const {
    data: healths,
    hasResponseBeenReceived,
    getResource: getHealths,
  } = useCosGetRequest(healthApi.getHealths, () => {
    return {
      dataCenter: dataCenter.name,
    } satisfies HealthApiGetHealthsRequest
  })

  const isLoading = !hasResponseBeenReceived

  useInterval(getHealths, HOME_OVERVIEW_PAGE_POLLING_INTERVAL)

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
    <CosDashboardPanel
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
    </CosDashboardPanel>
  )
}

export default HealthPanel
