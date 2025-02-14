import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosHeader,
  CosHeaderProps,
} from '../../../components/CosHeader/CosHeader'
import OpenStackIcon from '../../../components/CosIcon/colored/openstack.svg?react'
import CephIcon from '../../../components/CosIcon/colored/ceph.svg?react'
import KeycloakIcon from '../../../components/CosIcon/colored/keyclock.svg?react'
import RancherIcon from '../../../components/CosIcon/colored/rancher.svg?react'

const meta = {
  title: 'organisms/Header',
  component: CosHeader,
} satisfies Meta<typeof CosHeader>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  quickAccesses: [
    { Icon: KeycloakIcon, href: '/' },
    { Icon: CephIcon, href: '/' },
    { Icon: OpenStackIcon, href: '/' },
    { Icon: RancherIcon, href: '/' },
  ],
  onLogout: () => {
    // eslint-disable-next-line no-console
    console.log('logout')
  },
} satisfies CosHeaderProps

export const Group: Story = {
  args: defaultArgs,
  render: (props) => {
    return (
      <StoryLayout title="Header - Group" useSceneBgColor={false}>
        <CosHeader {...props} />
      </StoryLayout>
    )
  },
}
