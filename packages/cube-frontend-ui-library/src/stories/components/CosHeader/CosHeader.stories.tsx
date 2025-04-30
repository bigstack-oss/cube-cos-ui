import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  CosHeader,
  CosHeaderProps,
} from '../../../components/CosHeader/CosHeader'
import OpenStackIcon from '../../../components/CosIcon/colored/openstack.svg?react'
import CephIcon from '../../../components/CosIcon/colored/ceph.svg?react'
import KeycloakIcon from '../../../components/CosIcon/colored/keycloak.svg?react'
import RancherIcon from '../../../components/CosIcon/colored/rancher.svg?react'
import NotificationIcon from '@cube-frontend/ui-library/icons/monochrome/notification.svg?react'
import LogoutIcon from '@cube-frontend/ui-library/icons/monochrome/logout.svg?react'

const meta = {
  title: 'organisms/Header',
  component: CosHeader,
} satisfies Meta<typeof CosHeader>

export default meta

type Story = StoryObj<typeof meta>

const defaultArgs = {
  quickAccesses: [
    { Icon: KeycloakIcon, href: '/', hoverMessage: 'Keycloak' },
    { Icon: CephIcon, href: '/', hoverMessage: 'Ceph' },
    { Icon: OpenStackIcon, href: '/', hoverMessage: 'OpenStack' },
    { Icon: RancherIcon, href: '/', hoverMessage: 'Rancher' },
  ],
  functionBarItems: [
    {
      Icon: NotificationIcon,
      hoverMessage: 'Events',
    },
    {
      Icon: LogoutIcon,
      hoverMessage: 'Logout',
      onClick: () => {
        // eslint-disable-next-line no-console
        console.log('logout')
      },
    },
  ],
} satisfies CosHeaderProps

export const Group: Story = {
  args: defaultArgs,
  render: (props) => {
    return (
      <StoryLayout title="Header - Group" useSceneBgColor={false}>
        <CosHeader {...props} />
        <CosHeader {...props} isLoading={true} />
      </StoryLayout>
    )
  },
}
