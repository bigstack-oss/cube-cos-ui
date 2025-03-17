import { range } from 'lodash'
import { CosSkeleton } from '@cube-frontend/ui-library'

export const PieChartSkeleton = () => {
  return (
    <div className="flex items-center justify-center gap-11 px-5 py-3">
      <CosSkeleton className="size-[220px] shrink-0 rounded-full" />
      <div className="grid grid-cols-4 gap-x-9">
        {range(24).map((i) => (
          <div
            key={i}
            className="grid h-[30px] w-[143px] cursor-pointer grid-cols-3 items-center gap-2 px-2 py-[6px]"
          >
            <div className="col-span-2 flex items-center gap-1">
              <CosSkeleton className="size-[6px] rounded-full" />
              <CosSkeleton className="h-[15px] w-[70px]" />
            </div>
            <CosSkeleton className="h-[18px] w-[39px]" />
          </div>
        ))}
      </div>
    </div>
  )
}
