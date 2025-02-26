import { CosDropdown } from '@cube-frontend/ui-library'
import { useMemo, useState } from 'react'
import { HealthAccordionItem } from './HealthAccordionItem'
import {
  groupServicesByCategory,
  ServiceCategory,
  TimeRange,
  timeRanges,
} from './healthAccordionUtils'
import { mockServices } from './mockHealth'
import { useNow } from './useNow'

// TODO: Replace this with i18n.
const timeRangeLabels: Record<TimeRange, string> = {
  last30Days: 'Last 30 days',
  last14Days: 'Last 14 days',
  last7Days: 'Last 7 days',
  last24Hours: 'Last 24 hours',
  lastHour: 'Last hour',
}

export const HealthAccordion = () => {
  const [selectedTimeRange, setSelectedTimeRange] =
    useState<TimeRange>('last24Hours')

  const now = useNow()

  const categories = useMemo<ServiceCategory[]>(
    // TODO: Replace mock services with real API data once it's implemented.
    () => groupServicesByCategory(mockServices),
    [],
  )

  const [expandedCategoryName, setExpandedCategoryName] = useState<
    string | undefined
  >(categories[0]?.name)

  const onExpandedCategoryNameChange = (categoryName: string) => {
    if (categoryName === expandedCategoryName) {
      setExpandedCategoryName(undefined)
    } else {
      setExpandedCategoryName(categoryName)
    }
  }

  return (
    <div className="mt-[26px] flex flex-col gap-y-3">
      <div className="flex items-center justify-between">
        <span className="secondary-body1 text-functional-text-light">
          Details
        </span>
        <CosDropdown selectedItems={[selectedTimeRange]}>
          <CosDropdown.Trigger>
            {timeRangeLabels[selectedTimeRange]}
          </CosDropdown.Trigger>
          <CosDropdown.Menu>
            {timeRanges.map((timeRange) => (
              <CosDropdown.Item
                key={timeRange}
                item={timeRange}
                onClick={() => setSelectedTimeRange(timeRange)}
              >
                {timeRangeLabels[timeRange]}
              </CosDropdown.Item>
            ))}
          </CosDropdown.Menu>
        </CosDropdown>
      </div>
      {categories.map((category) => (
        <HealthAccordionItem
          key={category.name}
          category={category}
          isExpanded={expandedCategoryName === category.name}
          timeRange={selectedTimeRange}
          now={now}
          onExpand={() => onExpandedCategoryNameChange(category.name)}
        />
      ))}
    </div>
  )
}
