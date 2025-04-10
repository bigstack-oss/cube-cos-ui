import type { Meta, StoryObj } from '@storybook/react'
import { InlineNotificationLayout } from './InlineNotification/InlineNotificationLayout'
import { CosToastProvider } from '../../../components/CosNotification/CosToastNotification/CosToastProvider'
import { ToastNotificationLayout } from './ToastNotification/ToastNotificationLayout'

const meta = {
  title: 'Molecules/Notification',
} satisfies Meta

export default meta

export const InlineNotification: StoryObj = {
  render: () => <InlineNotificationLayout />,
}

export const ToastNotification: StoryObj = {
  render: () => (
    <CosToastProvider>
      <ToastNotificationLayout />
    </CosToastProvider>
  ),
}
