import classNames from 'classnames'
import { CubeButtonSize } from './Button'

export type ButtonSkeletonProps = {
  size: CubeButtonSize
}

const getClassName = (size: CubeButtonSize) => {
  const baseClasses = classNames('rounded-[5px] bg-functional-skeleton')

  const sizeClasses: Record<CubeButtonSize, string> = {
    sm: classNames('h-[26px] w-[104px]'),
    md: classNames('h-[34px] w-[118px]'),
    lg: classNames('h-[42px] w-[126px]'),
  }

  return classNames(baseClasses, sizeClasses[size])
}

const ButtonSkeleton = (props: ButtonSkeletonProps) => {
  const { size } = props

  return <div className={getClassName(size)} />
}

export default ButtonSkeleton
