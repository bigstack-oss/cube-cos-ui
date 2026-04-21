import type { Meta, StoryObj } from '@storybook/react-vite'
import { twJoin } from 'tailwind-merge'
import { CosCountSegmentedChart } from '../../../components/CosCountSegmentedChart/CosCountSegmentedChart'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosPercentagePieChart } from '../../../components/CosPercentagePieChart/CosPercentagePieChart'

const meta = {
  title: 'Molecules/Chart/Percentage Pie Chart',
} satisfies Meta<typeof CosCountSegmentedChart>

export default meta

export const Gallery: StoryObj = {
  render: () => <PercentagePieChartGallery />,
}

const rowClass = twJoin('flex flex-row flex-wrap gap-10')

const formatCpuPercentage = (value: number) => {
  return `${value / 100}x`
}

const PercentagePieChartGallery = () => {
  return (
    <StoryLayout title="Percentage Pie Chart">
      <StoryLayout.Section title="Default">
        <div className={rowClass}>
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={0}
            total={755.1}
          />
          {/* Show at least 1% in CosPercentagePieChart when percentage > 0. */}
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={0.01}
            total={755.1}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={8.2}
            total={755.1}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={380}
            total={755.1}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={388}
            total={755.1}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={80}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={81}
            total={100}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={99}
            total={100}
          />
          <CosPercentagePieChart
            title="Memory"
            unit="GB"
            used={100}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={101}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={150}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={199}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={200}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={250}
            total={100}
          />
          <CosPercentagePieChart
            title="Storage"
            unit="GB"
            used={300}
            total={100}
          />
        </div>
      </StoryLayout.Section>

      <StoryLayout.Section title="CPU Usage">
        <div className="flex flex-col gap-y-4">
          <span className="primary-body2 text-functional-text">
            Customize the color, overLimitText and thresholdPercentage(set to
            400).
          </span>
          <div className={rowClass}>
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={0}
              total={10}
            />
            {/* Show at least 1% in CosPercentagePieChart when percentage > 0. */}
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={0.01}
              total={10}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={4}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={200}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={396}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={400}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={404}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={600}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={796}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={800}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={1000}
              total={100}
            />
            <CosPercentagePieChart
              title="vCPU"
              unit="vCPU"
              color="stroke-chart-2"
              percentageFormatter={formatCpuPercentage}
              thresholdPercentage={400}
              used={1200}
              total={100}
            />
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className={rowClass}>
          <CosPercentagePieChart
            isLoading={true}
            title="Memory"
            unit="GB"
            overThresholdText="Over Limit"
            total={0}
            used={0}
          />
          <CosPercentagePieChart
            isLoading={true}
            title="Storage"
            unit="GB"
            overThresholdText="Over Limit"
            total={0}
            used={0}
          />
          <CosPercentagePieChart
            isLoading={true}
            title="CPU"
            unit="GB"
            total={0}
            used={0}
          />
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
