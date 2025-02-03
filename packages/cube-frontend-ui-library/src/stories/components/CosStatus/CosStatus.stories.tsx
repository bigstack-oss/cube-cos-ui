import { CosStatus, CosStatusSkeleton } from '@cube-frontend/ui-library'
import { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { StatusRow } from './StatusRow'

const meta = {
  title: 'Atoms/Status',
  component: CosStatus,
} satisfies Meta<typeof CosStatus>

export default meta

export const Gallery: StoryObj = {
  render: () => (
    <StoryLayout title="Status">
      <StoryLayout.Section title="Gallery">
        <div className="flex flex-col gap-y-8">
          <StatusRow title="Neutral">
            <CosStatus status="neutral" />
            <CosStatus status="in-use" />
            <CosStatus status="finished" />
          </StatusRow>
          <StatusRow title="Success">
            <CosStatus status="success" />
            <CosStatus status="active" />
            <CosStatus status="available" />
          </StatusRow>
          <StatusRow title="Warning">
            <CosStatus status="warning" />
            <CosStatus status="error" />
            <CosStatus status="failed" />
            <CosStatus status="stopped" />
          </StatusRow>
          <StatusRow title="Others">
            <CosStatus status="others" />
            <CosStatus status="deleted" />
            <CosStatus status="suspended" />
            <CosStatus status="expired" />
            <CosStatus status="pending" />
            <CosStatus status="anything-else" />
          </StatusRow>
          <StatusRow title="Skeleton">
            <CosStatusSkeleton />
          </StatusRow>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
