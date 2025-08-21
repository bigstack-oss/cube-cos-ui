import { HealthApiGetHealthsRequest } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { useUpdateTime } from '@cube-frontend/web-app/hooks/useUpdateTime'
import { noop } from 'lodash'
import { useContext, useMemo, useState } from 'react'
import { Link } from 'react-router'
import { links } from '../../../links'
import { HOME_OVERVIEW_PAGE_POLLING_INTERVAL } from '../../homeOverviewPageUtils'
import { HealthError } from './HealthError'
import { HealthStatus } from './HealthStatus/HealthStatus'
import { useDelayedRepairState } from './HealthStatus/useDelayedRepairState'
import { toHealthUIData } from './utils'
import { useTranslation } from 'react-i18next'

const HealthPanel = () => {
  const { dataCenter } = useContext(DataCenterContext)

  const { t } = useTranslation()

  const {
    data: healths,
    hasResponseBeenReceived,
    getResource: getHealths,
  } = useCosGetRequest(healthApi.getHealths, () => {
    return {
      dataCenter: dataCenter!.name,
    } satisfies HealthApiGetHealthsRequest
  })

  const isLoading = !hasResponseBeenReceived

  const { startPolling, stopPolling } = usePolling(
    getHealths,
    HOME_OVERVIEW_PAGE_POLLING_INTERVAL,
  )

  const updateTime = useUpdateTime(healths, isLoading)

  const { showRepairDoneText, observedServiceNames, setObservedServiceNames } =
    useDelayedRepairState(healths?.overall.status.isFixing ?? false)

  const { errorCount, errorServices } = useMemo(
    () => toHealthUIData(healths, observedServiceNames),
    [healths, observedServiceNames],
  )

  // Use a separate loading state instead of `useCosMutationRequest`'s `isLoading`
  // to keep the Repair button in the loading state until the `getHealths` API
  // finishes after calling `repairHealth`.
  const [isCallingRepairApi, setIsCallingRepairApi] = useState(false)

  const { mutateResource: repairHealth } = useCosMutationRequest(
    healthApi.repairAllModulesHealth,
  )

  const handleRepair = async () => {
    stopPolling()
    setIsCallingRepairApi(true)
    try {
      const errorServiceNames = errorServices.map((service) => service.name)
      setObservedServiceNames(new Set(errorServiceNames))
      await repairHealth({
        dataCenter: dataCenter!.name,
      })
    } catch (error) {
      console.error('Repair data center health error: ', error)
    } finally {
      await getHealths()
      startPolling()
      setIsCallingRepairApi(false)
    }
  }

  const isRepairButtonLoading =
    healths?.overall.status.isFixing || isCallingRepairApi

  return (
    <CosDashboardPanel
      title={t('home.tabs.health')}
      time={updateTime}
      errorCount={errorCount}
      hyperLinkProps={{ onClick: noop }}
      HyperLinkContainer={<Link to={links.health} />}
      isTimeLoading={isLoading}
    >
      {(isLoading || errorServices.length > 0 || showRepairDoneText) && (
        <HealthError
          isLoading={isLoading}
          errorServices={errorServices}
          onRepairClick={handleRepair}
          isRepairButtonLoading={isRepairButtonLoading}
          isRepairDone={showRepairDoneText}
        />
      )}
      <HealthStatus services={healths?.services} />
    </CosDashboardPanel>
  )
}

export default HealthPanel
