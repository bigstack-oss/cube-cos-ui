import { CosProgressBar } from '../../../components/CosProgressBar/CosProgressBar'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosProgressBarSkeleton } from '../../../components/CosProgressBar/CosProgressBarSkeleton'

const meta = {
  title: 'Atoms/Progress Bar',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => <ProgressBarGallery />,
}

const ProgressBarGallery = () => {
  return (
    <StoryLayout title="Progress Bar">
      <StoryLayout.Section title="Progress">
        <div className="flex flex-col gap-y-4">
          <CosProgressBar
            className="w-[90px]"
            progress={50}
            color="bg-chart-1"
          />
          <CosProgressBar progress={50} color="bg-chart-1" />
          <div className="flex items-center gap-x-4">
            <CosProgressBar progress={0} color="bg-chart-1" />
            <CosProgressBar progress={1} color="bg-chart-1" />
            <CosProgressBar progress={50} color="bg-chart-2" />
            <CosProgressBar progress={99} color="bg-chart-3" />
            <CosProgressBar progress={100} color="bg-chart-4" />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-4">
          <CosProgressBarSkeleton className="w-[90px]" />
          <CosProgressBarSkeleton />
          <div className="flex items-center gap-x-4">
            <CosProgressBarSkeleton />
            <CosProgressBarSkeleton />
            <CosProgressBarSkeleton />
            <CosProgressBarSkeleton />
            <CosProgressBarSkeleton />
          </div>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
