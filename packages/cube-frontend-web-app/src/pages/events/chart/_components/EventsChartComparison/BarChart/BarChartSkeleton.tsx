import { range } from 'lodash'
import { CosSkeleton } from '@cube-frontend/ui-library'

export const BarChartSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex items-center gap-3">
        <CosSkeleton className="h-[64px] w-[15px]" />
        <div className="flex flex-col gap-[34px]">
          {range(6).map((i) => (
            <div key={i} className="flex items-center gap-2">
              <CosSkeleton className="h-[20px] w-[25px]" />
              <CosSkeleton className="h-px w-[544px]" />
            </div>
          ))}
        </div>
      </div>
      <CosSkeleton className="h-[28px] w-[104px]" />
    </div>
  )
}
