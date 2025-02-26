import { GetHealthsResponseData } from '@cube-frontend/api'
import WarningFilled from '@cube-frontend/ui-library/icons/monochrome/warning_filled.svg?react'
import { capitalize } from 'lodash'

export type NgServiceProps = {
  service: GetHealthsResponseData['services'][number]
}

export const NgService = (props: NgServiceProps) => {
  const { service } = props

  const getModulesText = (): string => {
    return service.modules
      .map((module) => {
        const { status, name } = module
        const statusSymbol = status.current === 'ok' ? 'v' : 'x'
        return `${name}(${statusSymbol})`
      })
      .join('; ')
  }

  return (
    <div className="flex items-start gap-x-5">
      {/* Use an extra wrapper to align elements for the case where module
          text wraps to multiple lines. */}
      <div className="flex items-center gap-x-2">
        <WarningFilled className="size-4 shrink-0 text-status-negative" />
        <span className="primary-body3 font-semibold text-status-negative">
          {capitalize(service.name)}
        </span>
      </div>
      <span className="primary-body4 text-functional-text-light">
        {getModulesText()}
      </span>
    </div>
  )
}
