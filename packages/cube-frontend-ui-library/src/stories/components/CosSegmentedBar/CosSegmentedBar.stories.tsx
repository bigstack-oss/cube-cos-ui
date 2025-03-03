import {
  CosSegmentedBar,
  CosSegmentedBarSkeleton,
} from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { MouseEvent, useState } from 'react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import {
  healthHistorySegments,
  healthHistorySegmentsWithHoverContent,
  roleSummarySegments,
  vmSummarySegments,
} from './mockSegments'

const meta = {
  title: 'Atoms/Segmented Bar',
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
      <StoryLayout.Section title="Hover Tooltip">
        <CosSegmentedBar
          segments={healthHistorySegmentsWithHoverContent}
          rounded={true}
        />
      </StoryLayout.Section>
      <StoryLayout.Section title="Hover Event">
        <HoverEventStory />
      </StoryLayout.Section>
      <StoryLayout.Section title="Children Rendering">
        <CosSegmentedBar
          segments={healthHistorySegments}
          childrenDimensions={{
            height: 16,
            marginTop: 4,
          }}
        >
          {(barWidth) => (
            <foreignObject width={barWidth} height={16}>
              <div className="primary-body6 flex items-center justify-between text-functional-text-light">
                <span>07:00 AM</span>
                <span>12:34 PM</span>
                <span>NOW</span>
              </div>
            </foreignObject>
          )}
        </CosSegmentedBar>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <CosSegmentedBarSkeleton />
      </StoryLayout.Section>
    </StoryLayout>
  )
}

const HoverEventStory = () => {
  const [hoveredSegmentIndex, setHoveredSegmentIndex] = useState<
    number | undefined
  >(undefined)

  const onMouseEnterSegment = (
    index: number,
    e: MouseEvent<SVGRectElement>,
  ) => {
    // eslint-disable-next-line no-console
    console.log('Enter: ', {
      index,
      e,
    })
    setHoveredSegmentIndex(index)
  }

  const onMouseLeaveSegment = (
    index: number,
    e: MouseEvent<SVGRectElement>,
  ) => {
    // eslint-disable-next-line no-console
    console.log('Leave: ', {
      index,
      e,
    })
    setHoveredSegmentIndex(undefined)
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="primary-body3">
        Hovered segment: {hoveredSegmentIndex}
      </div>
      <div className="primary-body3">See console for logs.</div>
      <CosSegmentedBar
        segments={healthHistorySegmentsWithHoverContent}
        rounded={true}
        onMouseEnterSegment={onMouseEnterSegment}
        onMouseLeaveSegment={onMouseLeaveSegment}
      />
    </div>
  )
}
