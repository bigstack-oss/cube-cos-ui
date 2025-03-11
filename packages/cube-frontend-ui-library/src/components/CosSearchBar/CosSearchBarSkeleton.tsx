import { CosSkeleton } from '../CosSkeleton/CosSkeleton'

type CosSearchBarSkeletonProps = {
  variant: 'global' | 'filter'
}

export const CosSearchBarSkeleton = (props: CosSearchBarSkeletonProps) => {
  const { variant } = props

  const className =
    variant === 'global'
      ? 'rounded-[20px] w-[320px] h-[34px]'
      : 'rounded-[5px] w-[480px] h-[34px]'

  return <CosSkeleton className={className} />
}
