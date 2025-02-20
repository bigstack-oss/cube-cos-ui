import { CosSegmentedBar } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  healthHistorySegments,
  roleSummarySegments,
  vmSummarySegments,
} from './mockSegments'

const meta = {
  title: 'Molecules/Segmented Bar',
} satisfies Meta<typeof CosSegmentedBar>

export default meta

export const Gallery: StoryObj = {
  render: () => <SegmentedBarGallery />,
}

const SegmentedBarGallery = () => {
  return (
    <StoryLayout title="Segmented Bars">
      <StoryLayout.Section title="Default">
        <div className="flex flex-col gap-y-6">
          <CosSegmentedBar segments={vmSummarySegments} />
          <CosSegmentedBar segments={roleSummarySegments} />
          <CosSegmentedBar segments={healthHistorySegments} />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Custom Width">
        <div className="flex flex-col gap-y-6">
          <CosSegmentedBar segments={vmSummarySegments} width={128} />
          <div className="w-64">
            <CosSegmentedBar segments={roleSummarySegments} />
          </div>
          <CosSegmentedBar segments={healthHistorySegments} width={384} />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Rounded">
        <CosSegmentedBar segments={vmSummarySegments} rounded={true} />
      </StoryLayout.Section>
    </StoryLayout>
  )
}
