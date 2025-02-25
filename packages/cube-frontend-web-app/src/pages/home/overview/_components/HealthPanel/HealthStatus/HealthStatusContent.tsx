import { GetHealthsResponseDataServicesInner } from '@cube-frontend/api'
import CircleFillIcon from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'

type ServiceHealthStatusProps = {
  service: GetHealthsResponseDataServicesInner
}

const ServiceHealthStatus = (props: ServiceHealthStatusProps) => {
  const { service } = props

  return (
    <div className="flex items-center gap-x-2 text-functional-text">
      {service.status.current === 'ok' ? (
        <CircleFillIcon className="icon-md text-status-positive" />
      ) : (
        <WarningFilledIcon className="icon-md text-status-negative" />
      )}
      <div
        className={
          service.status.current === 'ok'
            ? 'text-functional-text'
            : 'text-status-negative'
        }
      >
        {service.name}
      </div>
    </div>
  )
}

type CategoryHealthStatusProps = {
  services: GetHealthsResponseDataServicesInner[]
}

const CategoryHealthStatus = (props: CategoryHealthStatusProps) => {
  const { services } = props

  return (
    <div className="flex min-w-[150px] flex-col gap-y-3">
      {services.map((service) => (
        <ServiceHealthStatus key={service.name} service={service} />
      ))}
    </div>
  )
}

export type HealthStatusContent = {
  categories: Record<string, GetHealthsResponseDataServicesInner[]>
}

export const HealthStatusContent = (props: HealthStatusContent) => {
  const { categories } = props

  return (
    <div className="flex gap-x-3">
      {Object.entries(categories).map(([category, services]) => (
        <CategoryHealthStatus key={category} services={services} />
      ))}
    </div>
  )
}
