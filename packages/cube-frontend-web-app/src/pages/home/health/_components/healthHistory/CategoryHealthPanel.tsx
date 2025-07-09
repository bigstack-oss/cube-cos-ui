import { Dayjs } from 'dayjs'
import { startCase } from 'lodash'
import { GetHealthHistoryPastEnum } from '@cube-frontend/api'
import { CosGeneralPanel } from '@cube-frontend/ui-library'
import { HealthTimeRange } from '../../healthTimeRangeUtils'
import { ServiceHealth } from './ServiceHealth'
import { ServiceCategory } from './healthHistoryUtils'

export type CategoryHealthPanelProps = {
  category: ServiceCategory
  timeRange: HealthTimeRange
  now: Dayjs
  past: GetHealthHistoryPastEnum
}

export const CategoryHealthPanel = (props: CategoryHealthPanelProps) => {
  const { category, timeRange, now, past } = props

  return (
    <CosGeneralPanel topic={startCase(category.name)}>
      <div className="grid grid-cols-2 gap-6 pt-2">
        {category.services.map((service) => (
          <div className="w-full" key={service.name}>
            <ServiceHealth
              service={service}
              timeRange={timeRange}
              now={now}
              past={past}
            />
          </div>
        ))}
      </div>
    </CosGeneralPanel>
  )
}
