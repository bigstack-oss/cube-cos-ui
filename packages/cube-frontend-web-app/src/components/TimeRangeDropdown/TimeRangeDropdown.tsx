import { CosDropdown } from '@cube-frontend/ui-library'

export type TimeRangeDropdownProps<T extends string> = {
  selectedItem: T
  disabled?: boolean
  onChange: (timeRange: T) => void
  timeRanges: readonly T[]
  timeRangeLabels: Record<T, string>
}

export const TimeRangeDropdown = <T extends string>(
  props: TimeRangeDropdownProps<T>,
) => {
  const { selectedItem, disabled, onChange, timeRanges, timeRangeLabels } =
    props

  return (
    <CosDropdown selectedItems={[selectedItem]} disabled={disabled}>
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
