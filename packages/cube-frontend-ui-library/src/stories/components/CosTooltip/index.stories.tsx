import { CosTooltip } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { HoverAndClickGrid } from './HoverAndClickGrid'
import { LayoutGrid } from './LayoutGrid'
import { NestedLayout } from './NestedLayout'
import { PlacementGrid } from './PlacementGrid'

const meta = {
  title: 'components/Tooltip',
} satisfies Meta<typeof CosTooltip>

export default meta

export const CosTooltipGallery: StoryObj = {
  render: () => <Gallery />,
}

const Gallery = () => {
  return (
    <StoryLayout title="Tooltip">
      <StoryLayout.Section title="Placements">
        <PlacementGrid />
      </StoryLayout.Section>
      <StoryLayout.Section title="Layout">
        <LayoutGrid />
      </StoryLayout.Section>
      <StoryLayout.Section title="Nested Layout">
        <NestedLayout />
      </StoryLayout.Section>
      <StoryLayout.Section title="Hover & Click">
        <HoverAndClickGrid />
      </StoryLayout.Section>
    </StoryLayout>
  )
}
