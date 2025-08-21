import {
  GetHealthsResponseDataOverallStatusCurrentEnum,
  GetHealthsResponseDataServicesInner,
} from '@cube-frontend/api'
import {
  CosButton,
  CosButtonSkeleton,
  CosDashboardPanel,
  CosLoadingSpinner,
  CosSkeleton,
} from '@cube-frontend/ui-library'
import CheckmarkCircleFillIcon from '@cube-frontend/ui-library/icons/monochrome/checkmark_circle_fill.svg?react'
import WarningFilledIcon from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'
import { range } from 'lodash'
import { serviceNameToLabel } from '../../../health/homeHealthPageUtils'
import { useTranslation } from 'react-i18next'

type ServiceErrorProps = {
  service: GetHealthsResponseDataServicesInner
}

const nameLabel = cva('primary-body3 font-semibold', {
  variants: {
    status: {
      ok: 'text-functional-text',
      ng: 'text-status-negative',
    } satisfies Record<
      GetHealthsResponseDataOverallStatusCurrentEnum,
      ClassValue
    >,
  },
})

const ServiceError = (props: ServiceErrorProps) => {
  const { service } = props

  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-x-5">
      <div className="flex items-center gap-x-2">
        {service.status.isFixing ? (
          <CosLoadingSpinner variant="dot45" />
        ) : service.status.current === 'ok' ? (
          <CheckmarkCircleFillIcon className="icon-md text-status-positive" />
        ) : (
          <WarningFilledIcon className="icon-md text-status-negative" />
        )}
        <span className={nameLabel({ status: service.status.current })}>
          {serviceNameToLabel(service.name)}
        </span>
      </div>
      <div className="primary-body4 text-functional-text-light">
        {service.status.isFixing
          ? `${t('home.overview.health.fixing')}...`
          : service.modules
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
      <CosSkeleton className="ml-5 h-[16px] w-[80px]" />
    </div>
  )
}

export type HealthErrorProps = {
  isLoading: boolean
  errorServices: GetHealthsResponseDataServicesInner[]
  isRepairButtonLoading: boolean
  isRepairDone: boolean
  onRepairClick: () => void
}

export const HealthError = (props: HealthErrorProps) => {
  const {
    isLoading,
    errorServices,
    isRepairButtonLoading,
    isRepairDone,
    onRepairClick,
  } = props

  const { t } = useTranslation()

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

    if (isRepairDone) {
      return (
        <span className="secondary-body3 font-semibold text-status-positive">
          {t('home.overview.health.done')}!
        </span>
      )
    }

    return (
      <CosButton
        size="md"
        loading={isRepairButtonLoading}
        onClick={onRepairClick}
      >
        {t('home.overview.health.repair')}
      </CosButton>
    )
  }

  return (
    <CosDashboardPanel.Item topic={t('home.overview.health.error')}>
      <div className="flex items-center justify-between gap-x-5">
        <div className="flex flex-1 flex-col gap-y-2">
          {renderErrorServices()}
        </div>
        {renderRepairButton()}
      </div>
    </CosDashboardPanel.Item>
  )
}
