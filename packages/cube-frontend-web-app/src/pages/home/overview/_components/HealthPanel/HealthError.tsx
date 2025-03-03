import { range } from 'lodash'
import { GetHealthsResponseDataServicesInner } from '@cube-frontend/api'
import {
  CosButton,
  CosButtonSkeleton,
  CosPanel,
  CosSkeleton,
} from '@cube-frontend/ui-library'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'

type ServiceErrorProps = {
  service: GetHealthsResponseDataServicesInner
}

const ServiceError = (props: ServiceErrorProps) => {
  const { service } = props

  return (
    <div key={service.name} className="flex items-center gap-x-5">
      <div className="flex items-center gap-x-2 text-status-negative">
        <WarningFilledIcon className="icon-md" />
        <span className="primary-body3 font-semibold">{service.name}</span>
      </div>
      <div className="primary-body4 text-functional-text-light">
        {service.modules
          .map((module) => {
            const name = module.name
            const status = module.status.current
            const statusDisplay = status === 'ng' ? 'x' : 'v'
            return `${name}(${statusDisplay})`
          })
          .join('; ')}
      </div>
    </div>
  )
}

const ErrorServiceSkeleton = () => {
  return (
    <div className="flex flex-1 items-center">
      <CosSkeleton className="size-[13px]" />
      <CosSkeleton className="ml-2 h-[16px] w-[129px]" />
      <CosSkeleton className="ml-5 h-[16px] flex-1" />
    </div>
  )
}

export type HealthErrorProps = {
  isLoading: boolean
  errorServices: GetHealthsResponseDataServicesInner[]
  isRepairButtonLoading: boolean
  onRepair: () => void
}

export const HealthError = (props: HealthErrorProps) => {
  const { isLoading, errorServices, isRepairButtonLoading, onRepair } = props

  const renderErrorServices = () => {
    if (isLoading) {
      return range(2).map((i) => <ErrorServiceSkeleton key={i} />)
    }

    return errorServices.map((service) => (
      <ServiceError key={service.name} service={service} />
    ))
  }

  const renderRepairButton = () => {
    if (isLoading) {
      return <CosButtonSkeleton size="md" />
    }

    return (
      <CosButton size="md" loading={isRepairButtonLoading} onClick={onRepair}>
        Repair
      </CosButton>
    )
  }

  return (
    <CosPanel.Item topic="Error">
      <div className="flex items-center justify-between gap-x-5">
        <div className="flex flex-1 flex-col gap-y-2">
          {renderErrorServices()}
        </div>
        {renderRepairButton()}
      </div>
    </CosPanel.Item>
  )
}
