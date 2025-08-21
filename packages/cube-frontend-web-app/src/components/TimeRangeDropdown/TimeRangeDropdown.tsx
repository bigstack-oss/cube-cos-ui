import { CosDropdown } from '@cube-frontend/ui-library'
import { TimeRange, useTimeRangeLabels } from './timeRangeUtils'

export type TimeRangeDropdownProps<T extends readonly TimeRange[]> = {
  disabled?: boolean
  timeRanges: T
  selectedItem: T[number]
  onChange: (timeRange: T[number]) => void
}

export const TimeRangeDropdown = <T extends readonly TimeRange[]>(
  props: TimeRangeDropdownProps<T>,
) => {
  const { disabled, timeRanges, selectedItem, onChange } = props

  const timeRangeLabels = useTimeRangeLabels()

  return (
    <CosDropdown
      type="radio"
      selectedItems={[selectedItem]}
      disabled={disabled}
    >
      <CosDropdown.Trigger>{timeRangeLabels[selectedItem]}</CosDropdown.Trigger>
      <CosDropdown.Menu>
        {timeRanges.map((timeRange) => (
          <CosDropdown.Item
            key={timeRange}
            item={timeRange}
            onClick={() => onChange(timeRange)}
          >
            {timeRangeLabels[timeRange]}
          </CosDropdown.Item>
        ))}
      </CosDropdown.Menu>
    </CosDropdown>
  )
}
