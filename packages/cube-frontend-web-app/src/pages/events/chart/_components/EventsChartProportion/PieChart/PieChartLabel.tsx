import { twMerge } from 'tailwind-merge'

type PieChartLabelProps = {
  eventId: string
  color: string
  percentage: number
  isBlur: boolean
  onMouseEnter: () => void
  onMouseLeave: () => void
  onClick: () => void
}

export const PieChartLabel = (props: PieChartLabelProps) => {
  const {
    eventId,
    color,
    percentage,
    isBlur,
    onMouseEnter,
    onMouseLeave,
    onClick,
  } = props

  return (
    <div
      className={twMerge(
        'grid h-[30px] w-[143px] cursor-pointer grid-cols-3 items-center gap-2 px-2 py-[6px]',
        isBlur && 'opacity-30',
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div className="col-span-2 flex items-center gap-1">
        <div
          className="size-[6px] rounded-full"
          style={{
            backgroundColor: color,
          }}
        />
        <p className="primary-body5">{eventId}</p>
      </div>
      <p className="primary-body3 col-span-1 text-right">{`${percentage.toFixed(1)}%`}</p>
    </div>
  )
}
