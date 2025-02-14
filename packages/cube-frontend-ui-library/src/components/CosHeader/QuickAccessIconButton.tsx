import { CosIconFrame, SvgComponent } from '@cube-frontend/ui-library'

export type QuickAccessIconButtonProps = {
  href: string
  Icon: SvgComponent
}

export const QuickAccessIconButton = (props: QuickAccessIconButtonProps) => {
  const { Icon, href } = props
  return (
    <a href={href} target="_blank">
      <CosIconFrame
        size="lg"
        className="cursor-pointer rounded-md hover:bg-functional-hover-secondary"
      >
        <Icon />
      </CosIconFrame>
    </a>
  )
}
