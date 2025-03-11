import { TimeRangeDropdown } from '@cube-frontend/web-app/components/TimeRangeDropdown/TimeRangeDropdown'
import { useTimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/useTimeRange'
import { useServices } from '@cube-frontend/web-app/hooks/useServices/useServices'
import { range } from 'lodash'
import { useEffect, useMemo, useState } from 'react'
import { HealthAccordionItem } from './HealthAccordionItem'
import { HealthAccordionItemSkeleton } from './HealthAccordionItemSkeleton'
import {
  groupServicesByCategory,
  ServiceCategory,
} from './healthAccordionUtils'

export const HealthAccordion = () => {
  const { now, timeRange, past, onTimeRangeChange } = useTimeRange()

  const { services, isLoadingServices } = useServices()

  const categories = useMemo<ServiceCategory[]>(
    () => groupServicesByCategory(services),
    [services],
  )

  const [expandedCategoryName, setExpandedCategoryName] = useState<
    string | undefined
  >()

  useEffect(() => {
    if (categories.length) {
      setExpandedCategoryName(categories[0].name)
    }
  }, [categories])

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
          disabled={isLoadingServices}
          onChange={onTimeRangeChange}
        />
      </div>
      {isLoadingServices
        ? range(0, 3).map((index) => (
            <HealthAccordionItemSkeleton key={index} />
          ))
        : categories.map((category) => (
            <HealthAccordionItem
              key={category.name}
              category={category}
              isExpanded={expandedCategoryName === category.name}
              timeRange={timeRange}
              now={now}
              past={past}
              onExpand={() => onExpandedCategoryNameChange(category.name)}
            />
          ))}
    </div>
  )
}
