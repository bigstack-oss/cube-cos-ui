import {
  CosProgressBar,
  CosProgressBarProps,
} from '../CosProgressBar/CosProgressBar'
import { CosProgressBarSkeleton } from '../CosProgressBar/CosProgressBarSkeleton'

type CosBarChart = {
  title: string
  subtext?: string
  /**
   * @default false
   */
  isLoading?: boolean
} & CosProgressBarProps

export const CosBarChart = (props: CosBarChart) => {
  const { title, subtext, isLoading, ...restProps } = props

  return (
    <div className="flex flex-1 flex-col items-stretch gap-y-[14px]">
      <div className="flex items-center gap-x-3">
        <span className="primary-body3 text-functional-text">{title}</span>
        <span className="primary-body3 text-functional-text">{subtext}</span>
      </div>
      {isLoading ? (
        <CosProgressBarSkeleton />
      ) : (
        <CosProgressBar {...restProps} />
      )}
    </div>
  )
}
