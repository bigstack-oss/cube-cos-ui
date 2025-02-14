import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosSideBar,
  CosSideBarProps,
} from '../../..//components/CosSideBar/CosSideBar'
import HomeIcon from '../../../components/CosIcon/monochrome/home_01.svg?react'
import NodeIcon from '../../../components/CosIcon/monochrome/node.svg?react'
import IntegrationsIcon from '../../../components/CosIcon/monochrome/integration.svg?react'
import MaintenanceIcon from '../../../components/CosIcon/monochrome/maintenance.svg?react'
import EventsIcon from '../../../components/CosIcon/monochrome/event.svg?react'
import SettingsIcon from '../../../components/CosIcon/monochrome/settings.svg?react'
import SideBarCombobox from '../../../components/CosSideBar/SideBarCombobox'
import SideBarTitle from '../../../components/CosSideBar/SideBarTitle'
import SideBarUserInfo from '../../../components/CosSideBar/SideBarUserInfo'
import SideBarBottom from '../../../components/CosSideBar/SideBarBottom'
import { SideBarOptionsGrid } from './SideBarOptionGrid'

const meta = {
  title: 'organisms/SideBar',
  component: CosSideBar,
} satisfies Meta<typeof CosSideBar>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  dataCenter: {
    name: 'KS',
    version: 'Cube Appliance 2.3.3',
  },
  username: 'Admin',
  options: [
    {
      Icon: HomeIcon,
      label: 'Home',
      notificationCount: 1,
      isSelected: true,
      onClick: () => {},
    },
    {
      Icon: NodeIcon,
      label: 'Nodes',
      notificationCount: 99,
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: IntegrationsIcon,
      label: 'Integrations',
      notificationCount: 100,
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: MaintenanceIcon,
      label: 'Maintenance',
      notificationCount: 0,
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: EventsIcon,
      label: 'Events',
      isSelected: false,
      onClick: () => {},
    },
    {
      Icon: SettingsIcon,
      label: 'Settings',
      isSelected: false,
      onClick: () => {},
    },
  ],
  links: [
    { text: 'CubeCMP', href: '/' },
    { text: 'Help', href: '/' },
  ],
} satisfies CosSideBarProps

export const Group: Story = {
  args: defaultArgs,
  render: (props) => {
    return (
      <StoryLayout title="Sidebar - Group" useSceneBgColor={true}>
        <CosSideBar {...props} />
      </StoryLayout>
    )
  },
}

export const Unit: Story = {
  args: defaultArgs,
  render: (props) => {
    const { dataCenter, username, options, links } = props

    return (
      <StoryLayout title="Sidebar - Unit" useSceneBgColor={true}>
        <StoryLayout.Section title="Title">
          <SideBarTitle />
        </StoryLayout.Section>
        <StoryLayout.Section title="User Info">
          <SideBarUserInfo dataCenter={dataCenter} username={username} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Combobox">
          <SideBarCombobox options={options} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Combobox Option">
          <SideBarOptionsGrid option={options[0]} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Bottom">
          <SideBarBottom links={links} />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
