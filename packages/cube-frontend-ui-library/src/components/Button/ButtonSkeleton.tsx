import classNames from 'classnames'
import { CubeButtonSize } from './Button'

export type ButtonSkeletonProps = {
  size: CubeButtonSize
}

const getClassName = (size: CubeButtonSize) => {
  const baseClasses = classNames('rounded-[5px] bg-functional-skeleton')

  const sizeClasses: Record<CubeButtonSize, string> = {
    sm: classNames('w-[104px] h-[26px]'),
    md: classNames('w-[118px] h-[34px]'),
    lg: classNames('w-[126px] h-[42px]'),
  }

  return classNames(baseClasses, sizeClasses[size])
}

const ButtonSkeleton = (props: ButtonSkeletonProps) => {
  const { size } = props

  return <div className={getClassName(size)} />
}

export default ButtonSkeleton
