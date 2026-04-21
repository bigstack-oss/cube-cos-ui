import { CosProgressBar } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Atoms/Progress Bar/Progress Bar',
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
          <CosProgressBar progress={0} color="bg-chart-1" />
          <CosProgressBar progress={1} color="bg-chart-2" />
          <CosProgressBar progress={50} color="bg-chart-3" />
          <CosProgressBar progress={99} color="bg-chart-4" />
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-4">
          <CosProgressBar.Skeleton />
          <CosProgressBar.Skeleton className="w-[90px]" />
          <div className="flex items-center gap-x-4">
            <CosProgressBar.Skeleton />
            <CosProgressBar.Skeleton />
            <CosProgressBar.Skeleton />
            <CosProgressBar.Skeleton />
            <CosProgressBar.Skeleton />
          </div>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
