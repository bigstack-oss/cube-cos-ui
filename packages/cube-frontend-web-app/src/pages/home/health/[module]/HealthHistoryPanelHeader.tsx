import { HealthApiRepairModuleHealthRequest } from '@cube-frontend/api'
import { CosButton, CosSkeleton } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { healthApi } from '@cube-frontend/web-app/api/cosApi'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { CosApiResponse } from '@cube-frontend/web-app/hooks/useCosRequest/cosRequestUtils'
import { useCosMutationRequest } from '@cube-frontend/web-app/hooks/useCosRequest/useCosMutationRequest'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { useContext } from 'react'
import { HealthTimeRange, healthTimeRanges } from '../healthTimeRangeUtils'
import { moduleNameToLabel } from '../homeHealthPageUtils'

export type HealthHistoryPanelHeaderProps = {
  module: ModuleMetadata | undefined
  isRepairable: boolean
  isFixing: boolean
  selectedTimeRange: HealthTimeRange
  onTimeRangeChange: (timeRange: HealthTimeRange) => void
  onToggleDetailPanel: () => void
}

export const HealthHistoryPanelHeader = (
  props: HealthHistoryPanelHeaderProps,
) => {
  const {
    module,
    isRepairable,
    isFixing,
    selectedTimeRange,
    onTimeRangeChange,
    onToggleDetailPanel,
  } = props

  const { dataCenter } = useContext(DataCenterContext)

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
        dataCenter: dataCenter!.name,
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
          {!module ? (
            <CosSkeleton className="h-6 w-16" />
          ) : (
            moduleNameToLabel(module.name)
          )}
        </span>
        <CosButton
          loading={isCallingRepairApi || isFixing}
          disabled={!module || !isRepairable}
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
          timeRanges={healthTimeRanges}
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
