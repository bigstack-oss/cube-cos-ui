import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { useMemo, useState } from 'react'
import { HealthAccordionItem } from './HealthAccordionItem'
import {
  groupServicesByCategory,
  ServiceCategory,
} from './healthAccordionUtils'
import { mockServices } from './mockHealth'
import { useNow } from './useNow'

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
        <TimeRangeDropdown
          selectedItem={selectedTimeRange}
          onChange={setSelectedTimeRange}
        />
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
