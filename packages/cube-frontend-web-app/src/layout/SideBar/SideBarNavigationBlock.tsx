import HomeIcon from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import NodeIcon from '@cube-frontend/ui-library/icons/monochrome/node.svg?react'
import IntegrationsIcon from '@cube-frontend/ui-library/icons/monochrome/integration.svg?react'
import MaintenanceIcon from '@cube-frontend/ui-library/icons/monochrome/maintenance.svg?react'
import EventsIcon from '@cube-frontend/ui-library/icons/monochrome/event.svg?react'
import SettingsIcon from '@cube-frontend/ui-library/icons/monochrome/settings.svg?react'
import { SideBarBlock } from './SideBarBlock'
import { SideBarNavLink } from './SideBarNavLink'

const SideBarNavigationBlock = () => {
  // TODO: setup this from react router.
  const menuItems = [
    { Icon: HomeIcon, onClick: () => {}, display: 'Home' },
    { Icon: NodeIcon, onClick: () => {}, display: 'Nodes' },
    { Icon: IntegrationsIcon, onClick: () => {}, display: 'Integrations' },
    { Icon: MaintenanceIcon, onClick: () => {}, display: 'Maintenance' },
    { Icon: EventsIcon, onClick: () => {}, display: 'Events' },
    { Icon: SettingsIcon, onClick: () => {}, display: 'Settings' },
  ]

  return (
    <SideBarBlock className="py-4">
      {menuItems.map((item, index) => (
        <SideBarNavLink key={index} Icon={item.Icon} onClick={item.onClick}>
          {item.display}
        </SideBarNavLink>
      ))}
    </SideBarBlock>
  )
}

export default SideBarNavigationBlock
