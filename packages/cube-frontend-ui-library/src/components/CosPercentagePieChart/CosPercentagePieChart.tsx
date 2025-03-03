import { StrokeColorClass } from '@cube-frontend/ui-theme'
import { PercentagePie } from './PercentagePie'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { twJoin } from 'tailwind-merge'

export type CosPercentageChartProps = {
  title: string
  unit: string
  total: number
  used: number
  /**
   * @default 'stroke-cosmos-secondary'
   */
  color?: StrokeColorClass
  /**
   * @default false
   */
  isLoading?: boolean
}

export const CosPercentagePieChart = (props: CosPercentageChartProps) => {
  const {
    title,
    unit,
    total,
    used,
    color = 'stroke-cosmos-secondary',
    isLoading = false,
  } = props

  const percentage = Math.floor((used / total) * 100)

  return (
    <div className="flex flex-col items-center gap-y-4">
      <span className="primary-body2 w-full text-left font-medium text-functional-title">
        {title}
      </span>
      {isLoading ? (
        <>
          <div className="relative">
            <CosSkeleton className="size-[144px] rounded-full" />
            <div
              className={twJoin(
                'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
                'flex size-[128px] flex-col items-center justify-center gap-y-1 rounded-full bg-white',
              )}
            >
              <CosSkeleton className="h-[24px] w-[53px]" />
              <CosSkeleton className="h-[15px] w-[53px]" />
            </div>
          </div>
          <CosSkeleton className="h-[15px] w-[144px]" />
        </>
      ) : (
        <>
          <div className="relative">
            <PercentagePie color={color} percentage={percentage} />
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-y-1">
              <span className="primary-h3 text-functional-title">
                {percentage}%
              </span>
              <span className="primary-body5 text-functional-text-light">{`${total} ${unit}`}</span>
            </div>
          </div>
          <span className="primary-body5 text-functional-text-light">{`${used}/${total} ${unit} Used`}</span>
        </>
      )}
    </div>
  )
}
