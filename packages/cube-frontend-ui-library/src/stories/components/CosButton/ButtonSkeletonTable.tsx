import { CosButtonSkeleton } from '../../../components/CosButton/CosButtonSkeleton'
import { PropsWithChildren } from 'react'

const DescriptionText = (props: PropsWithChildren) => {
  const { children } = props
  return (
    <span className="primary-body2 flex items-center justify-center font-semibold">
      {children}
    </span>
  )
}

const ButtonSkeletonTable = () => {
  return (
    <div className="grid grid-cols-[50px_126px_62px_156px_156px] gap-x-5 gap-y-[34px]">
      <DescriptionText />
      <DescriptionText>Text only</DescriptionText>
      <DescriptionText>Icon only</DescriptionText>
      <DescriptionText>Icon left</DescriptionText>
      <DescriptionText>Icon right</DescriptionText>

      <DescriptionText>MD</DescriptionText>
      <CosButtonSkeleton size="md" usage="text-only" />
      <CosButtonSkeleton size="md" usage="icon-only" />
      <CosButtonSkeleton size="md" usage="icon-left" />
      <CosButtonSkeleton size="md" usage="icon-right" />

      <DescriptionText>SM</DescriptionText>
      <CosButtonSkeleton size="sm" usage="text-only" />
      <CosButtonSkeleton size="sm" usage="icon-only" />
      <CosButtonSkeleton size="sm" usage="icon-left" />
      <CosButtonSkeleton size="sm" usage="icon-right" />

      <DescriptionText>LG</DescriptionText>
      <CosButtonSkeleton size="lg" usage="text-only" />
      <CosButtonSkeleton size="lg" usage="icon-only" />
      <CosButtonSkeleton size="lg" usage="icon-left" />
      <CosButtonSkeleton size="lg" usage="icon-right" />
    </div>
  )
}

export default ButtonSkeletonTable
