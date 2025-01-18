import { twMerge } from 'tailwind-merge'
import { CosSkeleton } from '../../internal/components/CosSkeleton/CosSkeleton'

export type InputSkeletonType = 'input' | 'label' | 'footerMessage'

export type CosInputSkeletonProps = {
  type: InputSkeletonType
}

const heightClasses: Record<InputSkeletonType, string> = {
  input: 'h-[38px]',
  label: 'h-[20px]',
  footerMessage: 'h-[16px]',
}

export const CosInputSkeleton = (props: CosInputSkeletonProps) => {
  const { type } = props

  return <CosSkeleton className={twMerge('w-full', heightClasses[type])} />
}
