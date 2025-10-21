import { useContext, useMemo } from 'react'
import { Dayjs } from 'dayjs'
import { useTranslation } from 'react-i18next'
import {
  GetHealthHistoryModuleTypeEnum,
  GetHealthHistoryPastEnum,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
  GetServiceHealthHistoryServiceTypeEnum,
  GetServicesResponseDataInner,
  HealthApiGetServiceHealthHistoryRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosGetRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosGetRequest'
import { usePolling } from '@cube-frontend/web-app/hooks/usePolling'
import { shouldDisplayLoading } from '@cube-frontend/web-app/utils/loadingDisplay'
import {
  HOME_HEALTH_PAGE_POLLING_INTERVAL,
  serviceNameToLabel,
} from '../../homeHealthPageUtils'
import { ModuleHealth } from './ModuleHealth'
import { useIsVisible } from './useIsVisible'
import { HealthTimeRange } from '../../healthTimeRangeUtils'

export type ServiceHealthProps = {
  service: GetServicesResponseDataInner
  timeRange: HealthTimeRange
  now: Dayjs
  past: GetHealthHistoryPastEnum
}

export const ServiceHealth = (props: ServiceHealthProps) => {
  const { service, timeRange, now, past } = props

  const { t } = useTranslation()

  const { dataCenter } = useContext(DataCenterContext)

  const { elementRef, isVisible } = useIsVisible<HTMLDivElement>()

  const {
    data: moduleHealths,
    isLoading,
    hasResponseBeenReceived,
    getResource: getServiceHealthHistory,
  } = useCosGetRequest(
    healthApi.getServiceHealthHistory,
    (): HealthApiGetServiceHealthHistoryRequest | undefined => {
      // Don't send the request when the container is not visible to avoid
      // hitting the browser's connection limit.
      if (!isVisible) {
        return undefined
      }
      return {
        dataCenter: dataCenter!.name,
        serviceType: service.name as GetServiceHealthHistoryServiceTypeEnum,
        past,
      }
    },
  )

  const { isPolling } = usePolling(async () => {
    if (isVisible) {
      await getServiceHealthHistory()
    }
  }, HOME_HEALTH_PAGE_POLLING_INTERVAL)

  const showLoading = shouldDisplayLoading({
    hasResponseBeenReceived,
    isLoading,
    isPolling,
  })

  const moduleHistoriesMap = useMemo<
    Map<
      GetHealthHistoryModuleTypeEnum,
      GetServiceHealthHistoryResponseDataInnerHistoryInner[]
    >
  >(() => {
    return new Map(
      (moduleHealths ?? []).map((moduleHealth) => [
        moduleHealth.module as GetHealthHistoryModuleTypeEnum,
        moduleHealth.history,
      ]),
    )
  }, [moduleHealths])

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3 font-medium text-functional-text">
        {serviceNameToLabel(service.name)}
      </div>
      <div
        ref={elementRef}
        className="rounded-[5px] border border-functional-border-divider"
      >
        <div className="secondary-body3 rounded-t-[5px] bg-scene-background px-4 py-2 text-functional-text-light">
          {t('home.health.healthStatus')}
        </div>
        {service.modules.map((module) => (
          <ModuleHealth
            key={module.name}
            moduleName={module.name as GetHealthHistoryModuleTypeEnum}
            isLoading={showLoading}
            history={
              moduleHistoriesMap.get(
                module.name as GetHealthHistoryModuleTypeEnum,
              ) ?? []
            }
            timeRange={timeRange}
            now={now}
          />
        ))}
      </div>
    </div>
  )
}
