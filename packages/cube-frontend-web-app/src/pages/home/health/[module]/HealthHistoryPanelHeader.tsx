import { CosButton, CosSkeleton } from '@cube-frontend/ui-library'
import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { HealthTimeRange, healthTimeRanges } from '../healthTimeRangeUtils'
import { moduleNameToLabel } from '../homeHealthPageUtils'

export type HealthHistoryPanelHeaderProps = {
  module: ModuleMetadata | undefined
  isRepairable: boolean
  isFixing: boolean
  selectedTimeRange: HealthTimeRange
  onTimeRangeChange: (timeRange: HealthTimeRange) => void
  onToggleDetailPanel: () => void
  onRepairClick: () => Promise<void>
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
    onRepairClick,
  } = props

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
        {isRepairable && (
          <CosButton
            loading={isFixing}
            disabled={!module}
            onClick={onRepairClick}
          >
            Repair
          </CosButton>
        )}
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
