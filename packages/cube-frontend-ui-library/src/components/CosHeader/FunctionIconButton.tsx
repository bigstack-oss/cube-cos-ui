import { CosIconFrame, SvgComponent } from '@cube-frontend/ui-library'

export type FunctionIconButtonProps = {
  onClick: () => void
  Icon: SvgComponent
}

// TODO: Clicking the button should trigger the overflow menu.
// Should add this feature after the overflow menu component is implemented.
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
