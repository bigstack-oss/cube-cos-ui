import { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../../internal/components/StoryLayout/StoryLayout'
import { CosColumnChart } from '../../../../components/CosChart'
import { ColumnChart } from './ColumnChart'

const meta = {
  title: 'Molecules/Chart/Column Chart',
} satisfies Meta<typeof CosColumnChart>

export default meta

export const Gallery: StoryObj<typeof CosColumnChart> = {
  render: function Render() {
    return (
      <StoryLayout title="Column Chart">
        <StoryLayout.Section title="Default">
          <ColumnChart />
        </StoryLayout.Section>
        <StoryLayout.Section title="No data">
          <ColumnChart hasData={false} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <ColumnChart isLoading={true} />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
