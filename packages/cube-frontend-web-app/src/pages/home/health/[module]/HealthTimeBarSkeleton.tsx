import { CosSegmentedBarSkeleton, CosSkeleton } from '@cube-frontend/ui-library'
import { range } from 'lodash'

export const HealthTimeBarSkeleton = () => {
  return (
    <div className="flex flex-col gap-y-2">
      <CosSegmentedBarSkeleton />
      <div className="flex items-start justify-between border-t border-t-functional-border-divider px-2">
        {range(0, 12).map((index) => (
          <div key={index} className="flex flex-col items-center gap-y-0.5">
            <span className="h-1 w-px bg-functional-text" />
            <div className="flex flex-col items-center gap-y-0.5">
              <CosSkeleton className="h-3 w-6" />
              <CosSkeleton className="h-3 w-8" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
