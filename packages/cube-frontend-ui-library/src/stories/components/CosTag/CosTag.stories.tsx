import { CosTag } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { TagLayout } from './TagLayout'

const meta = {
  title: 'Atoms/Tags',
} satisfies Meta<typeof CosTag>

export default meta

export const Gallery: StoryObj = {
  render: () => <TagGallery />,
}

const TagGallery = () => {
  return (
    <StoryLayout title="Tags">
      <StoryLayout.Section title="Default">
        <TagLayout color="default" />
      </StoryLayout.Section>
      <StoryLayout.Section title="Primary Blue">
        <TagLayout color="primary-blue" />
      </StoryLayout.Section>
      <StoryLayout.Section title="Blue">
        <TagLayout color="blue" />
      </StoryLayout.Section>
      <StoryLayout.Section title="Cyan">
        <TagLayout color="cyan" />
      </StoryLayout.Section>
      <StoryLayout.Section title="Dark">
        <TagLayout color="dark" />
      </StoryLayout.Section>
    </StoryLayout>
  )
}
