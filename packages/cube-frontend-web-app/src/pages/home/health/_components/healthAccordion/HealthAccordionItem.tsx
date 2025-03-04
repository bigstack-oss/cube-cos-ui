import ChevronDown from '@cube-frontend/ui-library/icons/monochrome/chevron_down.svg?react'
import { TimeRange } from '@cube-frontend/web-app/components/TimeRangeDropdown/timeRangeDropdownUtils'
import { cva } from 'class-variance-authority'
import { Dayjs } from 'dayjs'
import { capitalize } from 'lodash'
import { ServiceCategory } from './healthAccordionUtils'
import { ServiceHealth } from './ServiceHealth'

export type HealthAccordionItemProps = {
  category: ServiceCategory
  isExpanded: boolean
  timeRange: TimeRange
  now: Dayjs
  onExpand: () => void
}

const container = cva(
  [
    'flex flex-col gap-y-6 overflow-hidden rounded-[5px] bg-grey-0 px-8 py-6',
    'transition-all duration-200',
  ],
  {
    variants: {
      isExpanded: {
        true: 'max-h-[9999px]',
        false: 'max-h-20',
      },
    },
  },
)

const chevron = cva(
  'icon-md text-functional-text transition-transform duration-200',
  {
    variants: {
      isExpanded: {
        false: 'rotate-180',
      },
    },
  },
)

export const HealthAccordionItem = (props: HealthAccordionItemProps) => {
  const { category, isExpanded, timeRange, now, onExpand } = props

  return (
    <div className={container({ isExpanded })}>
      <div
        className="flex cursor-pointer items-center justify-between"
        onClick={onExpand}
      >
        <h5 className="secondary-h5 text-functional-text">
          {capitalize(category.name)}
        </h5>
        <span className="flex items-center justify-center p-2">
          <ChevronDown className={chevron({ isExpanded })} />
        </span>
      </div>
      {category.services.map((service) => (
        <ServiceHealth
          key={service.name}
          service={service}
          timeRange={timeRange}
          now={now}
        />
      ))}
    </div>
  )
}
