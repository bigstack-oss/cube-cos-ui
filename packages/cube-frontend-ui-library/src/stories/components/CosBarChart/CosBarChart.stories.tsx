import { CosBarChart } from '../../../components/CosBarChart/CosBarChart'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Molecules/Chart/Bar Chart',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => <ProgressBarGallery />,
}

const ProgressBarGallery = () => {
  return (
    <StoryLayout title="Bar Chart">
      <StoryLayout.Section title="Title">
        <div className="flex flex-col gap-y-4">
          <CosBarChart title="Chart Title" progress={50} color="bg-chart-1" />
          <div className="flex items-center gap-x-4">
            <CosBarChart title="Chart Title" progress={0} color="bg-chart-1" />
            <CosBarChart title="Chart Title" progress={1} color="bg-chart-1" />
            <CosBarChart title="Chart Title" progress={50} color="bg-chart-2" />
            <CosBarChart title="Chart Title" progress={99} color="bg-chart-3" />
            <CosBarChart
              title="Chart Title"
              progress={100}
              color="bg-chart-4"
            />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Title and Subtext">
        <div className="flex flex-col gap-y-4">
          <CosBarChart title="Chart Title" progress={50} color="bg-chart-1" />
          <div className="flex items-center gap-x-4">
            <CosBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={0}
              color="bg-chart-1"
            />
            <CosBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={1}
              color="bg-chart-1"
            />
            <CosBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={50}
              color="bg-chart-2"
            />
            <CosBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={99}
              color="bg-chart-3"
            />
            <CosBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={100}
              color="bg-chart-4"
            />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-4">
          <CosBarChart
            title="Chart Title"
            progress={0}
            color="bg-chart-1"
            isLoading={true}
          />
          <div className="flex items-center gap-x-4">
            <CosBarChart
              title="Chart Title"
              progress={0}
              color="bg-chart-1"
              isLoading={true}
            />
            <CosBarChart
              title="Chart Title"
              progress={0}
              color="bg-chart-1"
              isLoading={true}
            />
            <CosBarChart
              title="Chart Title"
              progress={0}
              color="bg-chart-2"
              isLoading={true}
            />
            <CosBarChart
              title="Chart Title"
              progress={0}
              color="bg-chart-3"
              isLoading={true}
            />
            <CosBarChart
              title="Chart Title"
              progress={100}
              color="bg-chart-4"
              isLoading={true}
            />
          </div>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
