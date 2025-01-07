import classNames from 'classnames'

export type InputSkeletonType = 'input' | 'label' | 'footerMessage'

export type CosInputSkeletonProps = {
  type: InputSkeletonType
}

const getClassNames = (type: InputSkeletonType) => {
  const baseClasses = classNames('w-full rounded-[5px] bg-functional-skeleton')

  const heightClasses: Record<InputSkeletonType, string> = {
    input: classNames('h-[38px]'),
    label: classNames('h-[20px]'),
    footerMessage: classNames('h-[16px]'),
  }

  return classNames(baseClasses, heightClasses[type])
}

export const CosInputSkeleton = (props: CosInputSkeletonProps) => {
  const { type } = props

  return <div className={getClassNames(type)} />
}
