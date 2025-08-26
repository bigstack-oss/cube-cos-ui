import { TimeRangeDropdown as TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { ModuleMetadata } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { HealthTimeRange, healthTimeRanges } from '../../healthTimeRangeUtils'

export type TimeRangeDropdownProps = {
  module: ModuleMetadata | undefined
  selectedTimeRange: HealthTimeRange
  onTimeRangeChange: (timeRange: HealthTimeRange) => void
}

export const TimeRangeDropdown = (props: TimeRangeDropdownProps) => {
  const { module, selectedTimeRange, onTimeRangeChange } = props

  return (
    <TimeRange
      selectedItem={selectedTimeRange}
      disabled={!module}
      onChange={onTimeRangeChange}
      timeRanges={healthTimeRanges}
    />
  )
}
