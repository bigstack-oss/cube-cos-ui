import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

export const CosPaginationSkeleton = () => (
  <div className="flex items-center justify-between">
    <CosSkeleton className="m-[10px] h-7 w-[67px]" />
    <div className="flex items-center">
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[6px] size-7" />
      <CosSkeleton className="m-[10px] h-7 w-[31px]" />
      <CosSkeleton className="h-7 w-[59px]" />
    </div>
    <div className="flex items-center">
      <CosSkeleton className="m-[10px] size-7" />
      <CosSkeleton className="h-7 w-[104px]" />
    </div>
  </div>
)
