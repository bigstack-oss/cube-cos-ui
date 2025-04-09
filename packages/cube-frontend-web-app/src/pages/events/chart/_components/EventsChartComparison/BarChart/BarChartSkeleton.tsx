import { range } from 'lodash'
import { CosSkeleton } from '@cube-frontend/ui-library'

const barCount = 10
const rowCount = 6

export const BarChartSkeleton = () => {
  return (
    <div className="relative flex flex-col items-center gap-2">
      {/* Y-axis labels and background lines. */}
      <div className="flex w-full grow flex-col gap-[34px]">
        {range(rowCount).map((i) => (
          <div key={i} className="flex items-center gap-2">
            <CosSkeleton className="h-[20px] w-[25px]" />
            <CosSkeleton className="h-px w-[544px] grow" />
          </div>
        ))}
      </div>
      {/* X-axis bars */}
      <div className="absolute bottom-[38px] flex w-full items-center justify-evenly pl-4">
        {range(barCount).map((i) => (
          <div key={i} className="flex w-[48px] justify-center">
            <CosSkeleton className="h-[200px] w-[16px] rounded-b-none" />
          </div>
        ))}
      </div>
      {/* X-axis labels */}
      <div className="flex w-full items-center justify-evenly pl-4">
        {range(barCount).map((i) => (
          <CosSkeleton key={i} className="h-[20px] w-[48px]" />
        ))}
      </div>
    </div>
  )
}
