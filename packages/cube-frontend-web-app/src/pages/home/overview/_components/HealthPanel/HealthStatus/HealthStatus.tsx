import { useTranslation } from 'react-i18next'
import { range } from 'lodash'
import { GetHealthsResponseDataServicesInner } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { ServiceHealthStatus } from './ServiceHealthStatus'
import { ServiceHealthStatusSkeleton } from './ServiceHealthStatusSkeleton'

export type HealthStatusProps = {
  services: GetHealthsResponseDataServicesInner[] | undefined
}

export const HealthStatus = (props: HealthStatusProps) => {
  const { services } = props

  const { t } = useTranslation()

  return (
    <CosDashboardPanel.Item
      topic={t('home.health.status')}
      className="overflow-x-auto"
    >
      <div className="grid grid-flow-col grid-rows-4 gap-x-3 gap-y-2">
        {!services
          ? range(20).map((i) => <ServiceHealthStatusSkeleton key={i} />)
          : services.map((service) => (
              <ServiceHealthStatus key={service.name} service={service} />
            ))}
      </div>
    </CosDashboardPanel.Item>
  )
}
