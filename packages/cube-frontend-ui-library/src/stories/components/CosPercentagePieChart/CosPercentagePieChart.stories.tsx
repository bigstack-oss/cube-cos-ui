import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPercentagePieChart } from '../../../components/CosPercentagePieChart.tsx/CosPercentagePieChart'
import { twJoin } from 'tailwind-merge'

const meta = {
  title: 'Molecules/Chart/Percentage Pie Chart',
} satisfies Meta<typeof CosCountSegmentedChart>

export default meta

export const Gallery: StoryObj = {
  render: () => <PercentagePieChartGallery />,
}

const rowClass = twJoin('flex flex-row gap-x-7')

const PercentagePieChartGallery = () => {
  return (
    <StoryLayout title="Percentage Pie Chart">
      <StoryLayout.Section title="Default Color">
        <div className={rowClass}>
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={144}
            used={0}
          />
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={100}
            used={1}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            total={755.1}
            used={124.4}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            total={100}
            used={99}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            total={24401.9}
            used={24401.9}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            total={100}
            used={400}
          />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Custom Color">
        <div className={rowClass}>
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={144}
            used={0}
            color="stroke-chart-1"
          />
          <CosPercentagePieChart
            title="vCPU"
            unit="vCPU"
            total={100}
            used={1}
            color="stroke-chart-2"
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            total={755.1}
            used={124.4}
            color="stroke-chart-3"
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            total={100}
            used={99}
            color="stroke-chart-4"
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            total={24401.9}
            used={24401.9}
            color="stroke-chart-5"
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            total={100}
            used={400}
            color="stroke-chart-6"
          />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
