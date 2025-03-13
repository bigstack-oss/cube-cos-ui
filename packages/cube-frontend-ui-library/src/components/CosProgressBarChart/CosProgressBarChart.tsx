import {
  CosProgressBar,
  CosProgressBarProps,
} from '../CosProgressBar/CosProgressBar'
import { CosProgressBarSkeleton } from '../CosProgressBar/CosProgressBarSkeleton'

type CosProgressBarChart = {
  title: string
  subtext?: string
  /**
   * @default false
   */
  isLoading?: boolean
  skeletonClassName?: string
} & CosProgressBarProps

export const CosProgressBarChart = (props: CosProgressBarChart) => {
  const {
    title,
    subtext,
    isLoading = false,
    skeletonClassName,
    ...restProps
  } = props

  return (
    <div className="flex flex-1 flex-col items-stretch gap-y-[14px]">
      <div className="flex items-center gap-x-3">
        <span className="primary-body3 text-functional-text">{title}</span>
        <span className="primary-body3 text-functional-text">{subtext}</span>
      </div>
      {isLoading ? (
        <CosProgressBarSkeleton className={skeletonClassName} />
      ) : (
        <CosProgressBar {...restProps} />
      )}
    </div>
  )
}
