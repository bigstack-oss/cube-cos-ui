import type { Meta, StoryObj } from '@storybook/react'
import { InlineNotificationLayout } from './InlineNotification/InlineNotificationLayout'

const meta = {
  title: 'Molecules/Notification',
} satisfies Meta

export default meta

export const InlineNotification: StoryObj = {
  render: () => <InlineNotificationLayout />,
}
