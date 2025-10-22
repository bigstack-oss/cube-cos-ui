import { useTranslation } from 'react-i18next'
import { GetHealthsResponseDataOverallStatusCurrentEnum } from '@cube-frontend/api'
import { cva } from 'class-variance-authority'
import { ClassValue } from 'class-variance-authority/types'

export type HealthStatusBadgeProps = {
  status: GetHealthsResponseDataOverallStatusCurrentEnum
}

const badge = cva(
  [
    'h-[19px] w-fit rounded px-1.5 py-0.5',
    'primary-body4 text-center font-extrabold text-grey-0',
  ],
  {
    variants: {
      status: {
        ok: 'bg-status-positive',
        ng: 'bg-status-negative',
      } satisfies Record<
        GetHealthsResponseDataOverallStatusCurrentEnum,
        ClassValue
      >,
    },
  },
)

export const HealthStatusBadge = (props: HealthStatusBadgeProps) => {
  const { status } = props

  const { t } = useTranslation()

  const statusDisplay: string = t(`home.health.status.${status}`)

  return (
    <span className={badge({ status })}>{statusDisplay.toUpperCase()}</span>
  )
}
