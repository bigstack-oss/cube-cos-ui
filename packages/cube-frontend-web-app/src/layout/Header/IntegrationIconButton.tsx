import { CosIconFrame } from '@cube-frontend/ui-library'
import { HeaderIconButtonProps } from './utils'

export const IntegrationIconButton = (props: HeaderIconButtonProps) => {
  const { children, onClick } = props
  return (
    <CosIconFrame
      size="lg"
      className="cursor-pointer rounded-md hover:bg-functional-hover-secondary"
      onClick={onClick}
    >
      {children}
    </CosIconFrame>
  )
}
