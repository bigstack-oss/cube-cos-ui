import { SideBarBlock } from './SideBarBlock'
import { SideBarBottomLink, SideBarBottomLinkProps } from './SideBarBottomLink'
import SideBarDivider from './SideBarDivider'
import SideBarTimeZone from './SideBarTimeZone'

export type SideBarBottomProps = {
  /**
   * @default false
   */
  isLoading?: boolean
  utcTimeZone: string | undefined
  links?: SideBarBottomLinkProps[]
}

const SideBarBottom = (props: SideBarBottomProps) => {
  const { isLoading = false, utcTimeZone, links = [] } = props

  return (
    <div className="flex w-full flex-1 flex-col justify-end">
      <SideBarTimeZone isLoading={isLoading} utcTimeZone={utcTimeZone} />
      <SideBarDivider />
      <SideBarBlock className="flex flex-col pb-4 pt-2">
        {links.map((link) => (
          <SideBarBottomLink key={link.text} {...link} />
        ))}
        <div className="flex h-[21px] items-center px-[22px] text-[9px] text-functional-text-light">
          Copyright©Bigstack
        </div>
      </SideBarBlock>
    </div>
  )
}

export default SideBarBottom
