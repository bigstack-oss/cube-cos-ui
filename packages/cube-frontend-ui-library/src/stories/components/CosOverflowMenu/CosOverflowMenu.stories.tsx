import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { ActionOverflowMenu } from './ActionOverflowMenu'
import { CheckMarkOverflowMenu } from './CheckMarkOverflowMenu'
import { MultipleOverflowMenu } from './MultipleOverflowMenu'
import { NotificationOverflowMenu } from './NotificationOverflowMenu'
import { SingleOverflowMenu } from './SingleOverflowMenu'

const meta = {
  title: 'Organisms/Overflow Menu',
} satisfies Meta

export default meta

const OverflowMenuGallery = () => {
  return (
    <StoryLayout title="Overflow Menu">
      <StoryLayout.Section title="Single">
        <SingleOverflowMenu />
      </StoryLayout.Section>
      <StoryLayout.Section title="Multiple">
        <MultipleOverflowMenu />
      </StoryLayout.Section>
      <StoryLayout.Section title="Check Mark">
        <CheckMarkOverflowMenu />
      </StoryLayout.Section>
      <StoryLayout.Section title="Action">
        <ActionOverflowMenu />
      </StoryLayout.Section>
      <StoryLayout.Section title="Notification">
        <NotificationOverflowMenu />
      </StoryLayout.Section>
    </StoryLayout>
  )
}

export const Gallery: StoryObj = {
  render: () => <OverflowMenuGallery />,
}
