import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

export const CosDropdownSkeleton = () => {
  return <CosSkeleton className={twMerge('w-full')} />
}
