import { HealthApiRepairModuleHealthRequest } from '@cube-frontend/api'
import { CosButton } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useContext } from 'react'

export type HealthHistoryPanelHeaderProps = {
  module: ModuleMetadata | undefined
  selectedTimeRange: TimeRange
  onTimeRangeChange: (timeRange: TimeRange) => void
  onToggleDetailPanel: () => void
}

export const HealthHistoryPanelHeader = (
  props: HealthHistoryPanelHeaderProps,
) => {
  const { module, selectedTimeRange, onTimeRangeChange, onToggleDetailPanel } =
    props

  const { name: dataCenter } = useContext(DataCenterContext)

  const { isLoading: isCallingRepairApi, mutateResource: repairModuleHealth } =
    useCosMutationRequest(
      healthApi.repairModuleHealth as (
        params: HealthApiRepairModuleHealthRequest,
      ) => Promise<CosApiResponse<undefined>>,
    )

  const onRepairClick = async () => {
    if (!module) {
      return
    }
    try {
      await repairModuleHealth({
        dataCenter,
        serviceType: module.service,
        moduleType: module.name,
      })
    } catch (error) {
      console.error('Repair module health error: ', error)
    }
  }

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-3">
        <span className="primary-h4 text-functional-text">
          {module?.name ?? 'TODO: Skeleton text'}
        </span>
        <CosButton
          loading={isCallingRepairApi}
          disabled={!module}
          onClick={onRepairClick}
        >
          Repair
        </CosButton>
      </div>
      <div className="flex items-center gap-x-2">
        <TimeRangeDropdown
          selectedItem={selectedTimeRange}
          disabled={!module}
          onChange={onTimeRangeChange}
        />
        <CosButton
          className="rounded-full"
          type="ghost"
          usage="icon-only"
          Icon={InformationCircle}
          disabled={!module}
          onClick={onToggleDetailPanel}
        />
      </div>
    </div>
  )
}
