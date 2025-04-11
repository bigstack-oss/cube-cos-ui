import { BackgroundColorClass } from '@cube-frontend/ui-theme'
import {
  CosProgressBar,
  CosProgressBarProps,
} from '../CosProgressBar/CosProgressBar'

type CosProgressBarChart = {
  title: string
  subtext?: string
  /**
   * @default false
   */
  isLoading?: boolean
  skeletonClassName?: string
} & Omit<CosProgressBarProps, 'color'>

export const CosProgressBarChart = (props: CosProgressBarChart) => {
  const {
    title,
    subtext,
    isLoading = false,
    skeletonClassName,
    progress,
    ...restProps
  } = props

  const getColor = (): BackgroundColorClass => {
    if (progress < 50) {
      return 'bg-chart-1'
    } else if (progress >= 50 && progress < 80) {
      return 'bg-status-warning'
    }
    return 'bg-status-negative'
  }

  return (
    <div className="flex flex-1 flex-col items-stretch gap-y-[14px]">
      <div className="flex items-center gap-x-3">
        <span className="primary-body3 text-functional-text">{title}</span>
        <span className="primary-body3 text-functional-text">{subtext}</span>
      </div>
      {isLoading ? (
        <CosProgressBar.Skeleton className={skeletonClassName} />
      ) : (
        <CosProgressBar {...restProps} color={getColor()} progress={progress} />
      )}
    </div>
  )
}
