import { CosSegmentedBarSkeleton, CosSkeleton } from '@cube-frontend/ui-library'
import { range } from 'lodash'

export const HealthBarSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-y-1">
      <CosSegmentedBarSkeleton />
      <div className="flex items-center justify-between">
        {range(0, 5).map((index) => (
          <CosSkeleton key={index} className="h-4 w-16" />
        ))}
      </div>
    </div>
  )
}
