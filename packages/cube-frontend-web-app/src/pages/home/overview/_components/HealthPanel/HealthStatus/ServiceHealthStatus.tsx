import { GetHealthsResponseDataServicesInner } from '@cube-frontend/api'
import CircleFillIcon from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import { serviceNameToLabel } from '@cube-frontend/web-app/pages/home/health/homeHealthPageUtils'

type ServiceHealthStatusProps = {
  service: GetHealthsResponseDataServicesInner
}

export const ServiceHealthStatus = (props: ServiceHealthStatusProps) => {
  const { service } = props

  return (
    <div className="flex w-[150px] items-center gap-x-2 text-functional-text">
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
        {serviceNameToLabel(service.name)}
      </div>
    </div>
  )
}
