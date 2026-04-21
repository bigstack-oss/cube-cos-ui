import { CosProgressBarChart } from '../../../components/CosProgressBarChart/CosProgressBarChart'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Molecules/Chart/Progress Bar Chart',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => <ProgressBarChartGallery />,
}

const ProgressBarChartGallery = () => {
  return (
    <StoryLayout title="Progress Bar Chart">
      <StoryLayout.Section title="Title">
        <div className="flex flex-col gap-y-4">
          <CosProgressBarChart
            className="w-[180px]"
            title="Chart Title"
            progress={34}
          />
          <CosProgressBarChart title="Chart Title" progress={50} />
          <div className="flex items-center gap-x-4">
            <CosProgressBarChart title="Chart Title" progress={0} />
            <CosProgressBarChart title="Chart Title" progress={1} />
            <CosProgressBarChart title="Chart Title" progress={79} />
            <CosProgressBarChart title="Chart Title" progress={85} />
            <CosProgressBarChart title="Chart Title" progress={100} />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Title and Subtext">
        <div className="flex flex-col gap-y-4">
          <CosProgressBarChart
            className="w-[180px]"
            title="Chart Title"
            progress={50}
          />
          <CosProgressBarChart title="Chart Title" progress={50} />
          <div className="flex items-center gap-x-4">
            <CosProgressBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={0}
            />
            <CosProgressBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={1}
            />
            <CosProgressBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={50}
            />
            <CosProgressBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={99}
            />
            <CosProgressBarChart
              title="Chart Title"
              subtext="Subtext"
              progress={100}
            />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-4">
          <CosProgressBarChart
            className="w-[180px]"
            skeletonClassName="w-[180px]"
            title="Chart Title"
            progress={0}
            isLoading={true}
          />
          <CosProgressBarChart
            title="Chart Title"
            progress={0}
            isLoading={true}
          />
          <div className="flex items-center gap-x-4">
            <CosProgressBarChart
              title="Chart Title"
              progress={0}
              isLoading={true}
            />
            <CosProgressBarChart
              title="Chart Title"
              progress={0}
              isLoading={true}
            />
            <CosProgressBarChart
              title="Chart Title"
              progress={0}
              isLoading={true}
            />
            <CosProgressBarChart
              title="Chart Title"
              progress={0}
              isLoading={true}
            />
            <CosProgressBarChart
              title="Chart Title"
              progress={100}
              isLoading={true}
            />
          </div>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
