import { CosIconFrame } from '@cube-frontend/ui-library'
import { HeaderIconButtonProps } from './utils'

export const FunctionalIconButton = (props: HeaderIconButtonProps) => {
  const { children, onClick } = props
  return (
    <CosIconFrame
      size="md"
      className="cursor-pointer rounded-md hover:bg-functional-hover-secondary"
      onClick={onClick}
    >
      {children}
    </CosIconFrame>
  )
}
