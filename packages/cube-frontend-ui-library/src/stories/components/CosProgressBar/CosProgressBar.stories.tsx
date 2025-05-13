import { CosProgressBar } from '../../../components/CosProgressBar/CosProgressBar'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

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
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <CosProgressBar progress={0} />
            <CosProgressBar progress={1} />
            <CosProgressBar progress={50} />
            <CosProgressBar progress={51} />
            <CosProgressBar progress={70} />
            <CosProgressBar progress={80} />
            <CosProgressBar progress={81} />
            <CosProgressBar progress={99} />
            <CosProgressBar progress={100} />
            <CosProgressBar progress={101} />
            <CosProgressBar progress={150} />
            <CosProgressBar progress={199} />
            <CosProgressBar progress={200} />
            <CosProgressBar progress={250} />
            <CosProgressBar progress={300} />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Default: Full Width
              </span>
              <CosProgressBar progress={50} />
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Custom Width
              </span>
              <CosProgressBar className="w-[90px]" progress={50} />
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Flex Display
              </span>
              <div className="flex items-center gap-x-4">
                <CosProgressBar className="flex-1" progress={50} />
                <CosProgressBar className="flex-1" progress={50} />
                <CosProgressBar className="flex-1" progress={50} />
                <CosProgressBar className="flex-1" progress={50} />
                <CosProgressBar className="flex-1" progress={50} />
              </div>
            </div>
          </div>
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
