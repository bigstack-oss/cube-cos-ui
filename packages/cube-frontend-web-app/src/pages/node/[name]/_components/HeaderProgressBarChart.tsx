import { CosProgressBar, CosSkeleton } from '@cube-frontend/ui-library'

type HeaderProgressBarChartProps = {
  /**
   * @default false
   */
  isLoading?: boolean
  label: string
  progress: number
}

export const HeaderProgressBarChart = (props: HeaderProgressBarChartProps) => {
  const { isLoading = false, label, progress } = props

  if (isLoading) {
    return (
      <div className="flex items-center gap-x-2">
        <CosSkeleton className="h-[15px] w-[30px]" />
        <CosSkeleton className="h-[9px] w-[58px]" />
        <CosSkeleton className="h-[15px] w-[23px]" />
      </div>
    )
  }

  return (
    <div className="flex items-center">
      <span className="primary-body4 mr-1 text-functional-text-light">
        {label}
      </span>
      <div className="flex w-[90px] items-center">
        <CosProgressBar color="bg-chart-1" progress={progress} />
      </div>
    </div>
  )
}
