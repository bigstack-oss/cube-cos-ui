import { twMerge } from 'tailwind-merge'
import { Link } from 'react-router'
import { PieChartData } from './pieChartUtils'
import { GetEventsTypeEnum } from '@cube-frontend/api'
import { getChartLabelByEventsType } from '../../utils'

type PieChartLabelProps = {
  event: PieChartData
  eventsType: GetEventsTypeEnum
  isBlur: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  redirectUrl: string
}

export const PieChartLabel = (props: PieChartLabelProps) => {
  const { event, eventsType, isBlur, onMouseEnter, onMouseLeave, redirectUrl } =
    props

  const chartLabel = getChartLabelByEventsType(eventsType, event)

  return (
    <Link
      className={twMerge(
        'grid w-full grid-cols-4 items-center gap-2 px-2 py-[6px]',
        isBlur && 'opacity-30',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      to={redirectUrl}
    >
      <div className="col-span-3 flex items-center gap-1">
        <div
          className="size-[6px] rounded-full"
          style={{
            backgroundColor: event.color,
          }}
        />
        <p className="primary-body5 text-functional-text">{chartLabel}</p>
      </div>
      <p className="primary-body3 col-span-1 text-right font-medium text-functional-text">{`${event.percent.toFixed(1)}%`}</p>
    </Link>
  )
}
