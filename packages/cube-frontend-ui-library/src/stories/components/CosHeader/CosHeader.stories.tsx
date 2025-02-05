import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosHeader,
  CosHeaderProps,
} from '../../..//components/CosHeader/CosHeader'
import OpenStackIcon from '@cube-frontend/ui-library/icons/colored/openstack.svg?react'
import CephIcon from '@cube-frontend/ui-library/icons/colored/ceph.svg?react'
import KeycloakIcon from '@cube-frontend/ui-library/icons/colored/keyclock.svg?react'
import RancherIcon from '@cube-frontend/ui-library/icons/colored/rancher.svg?react'

const meta = {
  title: 'organisms/Header',
  component: CosHeader,
} satisfies Meta<typeof CosHeader>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  onLogout: () => {
    console.log('logout')
  },
  quickAccesses: [
    { Icon: KeycloakIcon, href: '/' },
    { Icon: CephIcon, href: '/' },
    { Icon: OpenStackIcon, href: '/' },
    { Icon: RancherIcon, href: '/' },
  ],
} satisfies CosHeaderProps

export const Header: Story = {
  args: defaultArgs,
  render: (props) => {
    return (
      <StoryLayout title="Header" useSceneBgColor={false}>
        <CosHeader {...props} />
      </StoryLayout>
    )
  },
}

// export const Unit: Story = {
//   args: defaultArgs,
//   render: (props) => {
//     const { dataCenter, username, options, links } = props

//     return (
//       <StoryLayout title="Sidebar - Unit" useSceneBgColor={true}>
//         <StoryLayout.Section title="Title">
//           <SideBarTitle />
//         </StoryLayout.Section>
//         <StoryLayout.Section title="User Info">
//           <SideBarUserInfo dataCenter={dataCenter} username={username} />
//         </StoryLayout.Section>
//         <StoryLayout.Section title="Combobox">
//           <SideBarCombobox options={options} />
//         </StoryLayout.Section>
//         <StoryLayout.Section title="Combobox Option">
//           <SideBarOptionsGrid option={options[0]} />
//         </StoryLayout.Section>
//         <StoryLayout.Section title="Bottom">
//           <SideBarBottom links={links} />
//         </StoryLayout.Section>
//       </StoryLayout>
//     )
//   },
// }
