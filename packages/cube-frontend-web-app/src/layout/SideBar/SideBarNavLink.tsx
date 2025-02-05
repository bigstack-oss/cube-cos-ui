import { SvgComponent } from '@cube-frontend/ui-library'

export type SideBarNavLinkProps = {
  Icon: SvgComponent
  children: string
  onClick: () => void
}

export const SideBarNavLink = (props: SideBarNavLinkProps) => {
  const { Icon, children, onClick } = props

  return (
    <div
      className="secondary-body2 flex cursor-pointer items-center justify-start gap-x-3 px-[22px] py-[7px] text-functional-text transition hover:bg-functional-hover-secondary hover:font-medium hover:text-primary"
      onClick={onClick}
    >
      <Icon className="icon-md" />
      {children}
    </div>
  )
}
