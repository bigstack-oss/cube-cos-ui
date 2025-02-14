import { SideBarBlock } from './SideBarBlock'
import { SideBarBottomLink, SideBarBottomLinkProps } from './SideBarBottomLink'

export type SideBarBottomProps = {
  links?: SideBarBottomLinkProps[]
}

const SideBarBottom = (props: SideBarBottomProps) => {
  const { links = [] } = props

  return (
    <SideBarBlock className="flex flex-1 flex-col justify-end py-4">
      {links.map((link) => (
        <SideBarBottomLink key={link.text} {...link} />
      ))}
      <div className="flex h-[21px] items-center px-[22px] text-[9px] text-functional-text-light">
        Copyright©Bigstack
      </div>
    </SideBarBlock>
  )
}

export default SideBarBottom
