import { CosIconFrame, SvgComponent } from '@cube-frontend/ui-library'

export type FunctionIconButtonProps = {
  onClick: () => void
  Icon: SvgComponent
}

export const FunctionIconButton = (props: FunctionIconButtonProps) => {
  const { Icon, onClick } = props
  return (
    <CosIconFrame
      size="md"
      className="cursor-pointer rounded-md hover:bg-functional-hover-secondary"
      onClick={onClick}
    >
      <Icon />
    </CosIconFrame>
  )
}
