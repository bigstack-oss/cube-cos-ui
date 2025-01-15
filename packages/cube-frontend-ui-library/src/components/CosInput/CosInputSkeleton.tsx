import classNames from 'classnames'

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

  return (
    <div
      className={classNames(
        'w-full rounded-[5px] bg-functional-skeleton',
        heightClasses[type],
      )}
    />
  )
}
