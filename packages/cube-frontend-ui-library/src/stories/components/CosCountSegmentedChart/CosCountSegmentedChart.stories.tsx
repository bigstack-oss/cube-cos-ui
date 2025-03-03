import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { vmSummary, roleSummary } from './mockCountInfos'

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
      <StoryLayout.Section title="With Overview">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart
            overview={{ name: 'Total VM', count: vmTotalCount }}
            countInfos={vmSummary}
          />
          <CosCountSegmentedChart
            overview={{ name: 'Control-convergerd', count: 2 }}
            countInfos={roleSummary}
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Without Overview">
        <div className="flex flex-col gap-y-6">
          <CosCountSegmentedChart countInfos={vmSummary} />
          <CosCountSegmentedChart countInfos={roleSummary} />
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
