import { range } from 'lodash'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

type CosStepProcessSkeletonProps = {
  /**
   * @default 5
   */
  length?: number
}

export const CosStepProcessSkeleton = (props: CosStepProcessSkeletonProps) => {
  const { length = 5 } = props
  return (
    <div className="flex gap-3">
      {range(0, length).map((_, index) => (
        <div key={index} className="group flex">
          <CosSkeleton className="mr-2 size-[18px]" />
          <CosSkeleton className="mr-3 h-[18px] w-[58px]" />
          <CosSkeleton className="size-[18px] group-last:hidden" />
        </div>
      ))}
    </div>
  )
}
