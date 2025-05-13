import { StrokeColorClass } from '@cube-frontend/ui-theme'
import { PercentagePie } from './PercentagePie'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { twJoin } from 'tailwind-merge'

export type CosPercentagePieChartProps = {
  title: string
  unit: string
  total: number
  used: number
  /**
   * @default 100
   */
  thresholdPercentage?: number
  /**
   * If not provided, the color will be determined based on the percentage.
   */
  color?: StrokeColorClass
  percentageFormatter?: (value: number) => string
  /**
   * @default Over Limit
   */
  overThresholdText?: string
  /**
   * @default false
   */
  isLoading?: boolean
}

const defaultPercentageFormatter = (value: number) => {
  return `${value}%`
}

const getPercentageColor = (percentage: number): StrokeColorClass => {
  if (percentage <= 50) {
    return 'stroke-chart-1'
  } else if (percentage > 50 && percentage <= 80) {
    return 'stroke-status-warning'
  }
  return 'stroke-status-negative'
}

export const CosPercentagePieChart = (props: CosPercentagePieChartProps) => {
  const {
    title,
    unit,
    total,
    used,
    color: colorProp,
    thresholdPercentage = 100,
    percentageFormatter = defaultPercentageFormatter,
    overThresholdText = 'Over Limit',
    isLoading = false,
  } = props

  // Default to 0 to avoid NaN when total is 0.
  const percentage = Math.floor((used / total) * 100) || 0
  const color = colorProp ?? getPercentageColor(percentage)
  const isOverThreshold = percentage > thresholdPercentage

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
            <PercentagePie
              color={color}
              percentage={percentage}
              thresholdPercentage={thresholdPercentage}
            />
            <div className="absolute left-1/2 top-[50px] flex -translate-x-1/2 flex-col items-center gap-y-1">
              <span className="primary-h3 text-functional-title">
                {percentageFormatter(percentage)}
              </span>
              <div className="flex flex-col items-center">
                <span className="primary-body5 text-functional-text-light">{`${total} ${unit}`}</span>
                {isOverThreshold && (
                  <span className="primary-body5 text-status-negative">
                    {overThresholdText}
                  </span>
                )}
              </div>
            </div>
          </div>
          <span className="primary-body5 text-functional-text-light">{`${used}/${total} ${unit} Used`}</span>
        </>
      )}
    </div>
  )
}
