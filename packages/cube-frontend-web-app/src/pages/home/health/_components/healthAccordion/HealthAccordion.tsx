import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { useMemo, useState } from 'react'
import { HealthAccordionItem } from './HealthAccordionItem'
import {
  groupServicesByCategory,
  ServiceCategory,
} from './healthAccordionUtils'
import { mockServices } from './mockHealth'

export const HealthAccordion = () => {
  const { now, timeRange, onTimeRangeChange } = useTimeRange()

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
          selectedItem={timeRange}
          onChange={onTimeRangeChange}
        />
      </div>
      {categories.map((category) => (
        <HealthAccordionItem
          key={category.name}
          category={category}
          isExpanded={expandedCategoryName === category.name}
          timeRange={timeRange}
          now={now}
          onExpand={() => onExpandedCategoryNameChange(category.name)}
        />
      ))}
    </div>
  )
}
