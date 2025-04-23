import SideBarBottom, { SideBarBottomProps } from './SideBarBottom'
import SideBarCombobox, { SideBarComboboxProps } from './SideBarCombobox'
import SideBarTitle, { SideBarTitleProps } from './SideBarTitle'
import SideBarUserInfo, { SideBarUserInfoProps } from './SideBarUserInfo'

export type CosSideBarProps = SideBarTitleProps &
  SideBarUserInfoProps &
  SideBarComboboxProps &
  SideBarBottomProps

export const CosSideBar = (props: CosSideBarProps) => {
  const { LogoContainer, isLoading, dataCenter, username, options, links } =
    props

  return (
    <div
      className="flex min-h-svh w-[200px] shrink-0 flex-col bg-grey-0"
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <SideBarTitle LogoContainer={LogoContainer} />
      <SideBarUserInfo
        isLoading={isLoading}
        dataCenter={dataCenter}
        username={username}
      />
      <SideBarCombobox options={options} />
      <SideBarBottom links={links} />
    </div>
  )
}
