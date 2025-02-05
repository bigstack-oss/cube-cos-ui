import SideBarLogoBlock from './SideBarLogoBlock'
import SideBarInfoBlock from './SideBarInfoBlock'
import SideBarNavigationBlock from './SideBarNavigationBlock'
import SideBarFooterBlock from './SidebarFooterBlock'

const Sidebar = () => {
  return (
    <div
      className="flex min-h-svh w-[200px] shrink-0 flex-col bg-grey-0"
      style={{ boxShadow: '0px 0px 2px 0px rgba(0, 0, 0, 0.20)' }}
    >
      <SideBarLogoBlock />
      <SideBarInfoBlock />
      <SideBarNavigationBlock />
      <SideBarFooterBlock />
    </div>
  )
}

export default Sidebar
