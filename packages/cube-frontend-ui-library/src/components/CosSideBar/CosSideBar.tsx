import SideBarTitle from './SideBarTitle'
import SideBarUserInfo, { SideBarUserInfoProps } from './SideBarUserInfo'
import SideBarCombobox, { SideBarComboboxProps } from './SideBarCombobox'
import SideBarBottom, { SideBarBottomProps } from './SideBarBottom'

export type CosSideBarProps = SideBarUserInfoProps &
  SideBarComboboxProps &
  SideBarBottomProps

export const CosSideBar = (props: CosSideBarProps) => {
  const { dataCenter, username, options, links } = props

  return (
    <div
      className="flex min-h-svh w-[200px] shrink-0 flex-col bg-grey-0"
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <SideBarTitle />
      <SideBarUserInfo dataCenter={dataCenter} username={username} />
      <SideBarCombobox options={options} />
      <SideBarBottom links={links} />
    </div>
  )
}
