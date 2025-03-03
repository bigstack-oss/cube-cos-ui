import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { vmSummary, roleSummary } from './mockCountInfos'
import { toPluralizeDisplay } from '@cube-frontend/utils'

const meta = {
  title: 'Molecules/Chart/Count Segmented Chart',
} satisfies Meta<typeof CosCountSegmentedChart>

export default meta

export const Gallery: StoryObj = {
  render: () => <CountSegmentedChartGallery />,
}

const CountSegmentedChartGallery = () => {
  const vmTotalCount = vmSummary.reduce((total, countInfo) => {
    return total + countInfo.count
  }, 0)

  return (
    <StoryLayout title="Count Segmented Chart">
      <StoryLayout.Section title="With Title, subtext and Overview">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart
            title="VM Status"
            subtext={toPluralizeDisplay(vmTotalCount, 'Instance')}
            overview={{ name: 'Total VM', count: vmTotalCount }}
            countInfos={vmSummary}
          />
          <CosCountSegmentedChart
            title="Role Distribution"
            subtext="2 Roles"
            overview={{ name: 'Control-convergerd', count: 2 }}
            countInfos={roleSummary}
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Without Title, subtext and Overview">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart countInfos={vmSummary} />
          <CosCountSegmentedChart countInfos={roleSummary} />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton With Title and Subtext">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart
            title="VM Status"
            subtext={toPluralizeDisplay(vmTotalCount, 'Instance')}
            isLoading={true}
            countInfos={[]}
          />
          <CosCountSegmentedChart
            title="Role Distribution"
            subtext="2 Roles"
            isLoading={true}
            skeletonCount={3}
            countInfos={[]}
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton With Title">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart
            title="VM Status"
            isLoading={true}
            countInfos={[]}
          />
          <CosCountSegmentedChart
            title="Role Distribution"
            isLoading={true}
            skeletonCount={3}
            countInfos={[]}
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart isLoading={true} countInfos={[]} />
          <CosCountSegmentedChart
            isLoading={true}
            skeletonCount={3}
            countInfos={[]}
          />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
