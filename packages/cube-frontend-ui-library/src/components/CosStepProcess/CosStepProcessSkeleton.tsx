import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

export const CosStepProcessSkeleton = (props: { length?: number }) => {
  const { length = 5 } = props
  return (
    <div className="flex gap-3">
      {Array.from({ length }).map((_, index) => (
        <div className="flex">
          <CosSkeleton className="mr-2 size-[18px]" />
          <CosSkeleton className="mr-3 h-[18px] w-[58px]" />
          {index !== length - 1 && <CosSkeleton className="size-[18px]" />}
        </div>
      ))}
    </div>
  )
}
