import HyperLinkIcon from '../CosIcon/monochrome/hyperlink.svg?react'

export type SideBarBottomLinkProps = {
  text: string
  href: string
}

export const SideBarBottomLink = (props: SideBarBottomLinkProps) => {
  const { text, href } = props

  return (
    <a
      className="group primary-body5 flex h-[21px] cursor-pointer items-center justify-between px-[22px] text-functional-text"
      href={href}
    >
      {text}
      <HyperLinkIcon className="icon-sm invisible text-functional-text group-hover:visible" />
    </a>
  )
}
