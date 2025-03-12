import { GetHealthsResponseDataServicesInner } from '@cube-frontend/api'
import { CosDashboardPanel } from '@cube-frontend/ui-library'
import { HealthStatusSkeleton } from './HealthStatusSkeleton'
import { HealthStatusContent } from './HealthStatusContent'

export type HealthStatusProps = {
  isLoading: boolean
  categories: Record<string, GetHealthsResponseDataServicesInner[]>
}

export const HealthStatus = (props: HealthStatusProps) => {
  const { isLoading, categories } = props

  return (
    <CosDashboardPanel.Item topic="Status">
      {isLoading ? (
        <HealthStatusSkeleton />
      ) : (
        <HealthStatusContent categories={categories} />
      )}
    </CosDashboardPanel.Item>
  )
}
