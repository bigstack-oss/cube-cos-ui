import type { Meta, StoryObj } from '@storybook/react'
import { CosStroke } from '../../../components/CosStroke/CosStroke'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { StrokeBox } from './StrokeBox'

const meta = {
  title: 'Atoms/Stroke',
  component: CosStroke,
} satisfies Meta<typeof CosStroke>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Stroke">
      <StoryLayout.Section title="Stroke">
        <StrokeBox title="Master">
          <CosStroke type="regular" />
        </StrokeBox>
      </StoryLayout.Section>
      <StoryLayout.Section title="Stroke">
        <div className="flex flex-col gap-y-8">
          <StrokeBox title="Regular (default color)">
            <CosStroke type="regular" />
          </StrokeBox>
          <StrokeBox title="Regular (custom color)">
            <CosStroke type="regular" color="border-primary-500" />
          </StrokeBox>
          <StrokeBox title="Dot (default color)">
            <CosStroke type="dot" />
          </StrokeBox>
          <StrokeBox title="Dot (custom color)">
            <CosStroke type="dot" color="border-secondary-500" />
          </StrokeBox>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
