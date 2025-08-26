import { CosButtonSize, CosButtonUsage } from './CosButton'
import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../CosSkeleton/CosSkeleton'
import { buttonSkeleton } from './cosButtonStyles'

export type CosButtonSkeletonProps = {
  /**
   * @default 'md
   */
  size?: CosButtonSize
  /**
   * @default 'text-only'
   */
  usage?: CosButtonUsage
}

export const CosButtonSkeleton = (props: CosButtonSkeletonProps) => {
  const { size = 'md', usage = 'text-only' } = props

  return <CosSkeleton className={twMerge(buttonSkeleton({ size, usage }))} />
}
