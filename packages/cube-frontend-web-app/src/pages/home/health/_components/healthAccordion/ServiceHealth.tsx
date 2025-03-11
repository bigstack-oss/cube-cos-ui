import {
  GetHealthHistoryModuleTypeEnum,
  GetHealthHistoryPastEnum,
  GetServiceHealthHistoryResponseDataInnerHistoryInner,
  GetServiceHealthHistoryServiceTypeEnum,
  GetServicesResponseDataInner,
  HealthApiGetServiceHealthHistoryRequest,
} from '@cube-frontend/api'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useCosStreamRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosStreamRequest'
import { Dayjs } from 'dayjs'
import { upperFirst } from 'lodash'
import { useContext, useMemo } from 'react'
import { ModuleHealth } from './ModuleHealth'
import { useIsVisible } from './useIsVisible'

export type ServiceHealthProps = {
  service: GetServicesResponseDataInner
  timeRange: TimeRange
  now: Dayjs
  past: GetHealthHistoryPastEnum
}

export const ServiceHealth = (props: ServiceHealthProps) => {
  const { service, timeRange, now, past } = props

  const { name: dataCenter } = useContext(DataCenterContext)

  const { elementRef, isVisible } = useIsVisible<HTMLDivElement>()

  const { data: moduleHealths, isLoading } = useCosStreamRequest(
    healthApi.getServiceHealthHistory,
    (): HealthApiGetServiceHealthHistoryRequest | undefined => {
      // Don't send the request when the container is not visible to avoid
      // hitting the browser's connection limit.
      if (!isVisible) {
        return undefined
      }
      return {
        dataCenter,
        serviceType: service.name as GetServiceHealthHistoryServiceTypeEnum,
        past,
      }
    },
  )

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
        {upperFirst(service.name)}
      </div>
      <div
        ref={elementRef}
        className="rounded-t-[5px] border border-functional-border-divider"
      >
        <div className="secondary-body3 bg-scene-background px-4 py-2 text-functional-text-light">
          Health status
        </div>
        {service.modules.map((module) => (
          <ModuleHealth
            key={module.name}
            moduleName={module.name as GetHealthHistoryModuleTypeEnum}
            isLoading={isLoading}
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
