import { CosDropdown } from '@cube-frontend/ui-library'
import { TimeRange, timeRanges } from './timeRangeDropdownUtils'

export type TimeRangeDropdownProps = {
  selectedItem: TimeRange
  disabled?: boolean
  onChange: (timeRange: TimeRange) => void
}

// TODO: Replace this with i18n.
const timeRangeLabels: Record<TimeRange, string> = {
  last30Days: 'Last 30 days',
  last14Days: 'Last 14 days',
  last7Days: 'Last 7 days',
  last24Hours: 'Last 24 hours',
  lastHour: 'Last hour',
}

export const TimeRangeDropdown = (props: TimeRangeDropdownProps) => {
  const { selectedItem, disabled, onChange } = props

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
