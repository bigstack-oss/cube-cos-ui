import { CosResourceUsageBar } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Atoms/Progress Bar/Resource Usage Bar',
} satisfies Meta

export default meta

export const Gallery: StoryObj = {
  render: () => <ResourceUsageBarGallery />,
}

const ResourceUsageBarGallery = () => {
  return (
    <StoryLayout title="Resource Usage Bar">
      <StoryLayout.Section title="Resource Usage Bar">
        <div className="flex flex-col gap-y-8">
          <div className="flex flex-col gap-y-4">
            <CosResourceUsageBar progress={0} />
            <CosResourceUsageBar progress={1} />
            <CosResourceUsageBar progress={50} />
            <CosResourceUsageBar progress={51} />
            <CosResourceUsageBar progress={70} />
            <CosResourceUsageBar progress={80} />
            <CosResourceUsageBar progress={81} />
            <CosResourceUsageBar progress={99} />
            <CosResourceUsageBar progress={100} />
            <CosResourceUsageBar progress={101} />
            <CosResourceUsageBar progress={150} />
            <CosResourceUsageBar progress={199} />
            <CosResourceUsageBar progress={200} />
            <CosResourceUsageBar progress={250} />
            <CosResourceUsageBar progress={300} />
          </div>
          <div className="flex flex-col gap-y-4">
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Default: Full Width
              </span>
              <CosResourceUsageBar progress={50} />
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Custom Width
              </span>
              <CosResourceUsageBar className="w-[90px]" progress={50} />
            </div>
            <div className="flex flex-col gap-y-4">
              <span className="primary-body2 text-functional-text">
                Flex Display
              </span>
              <div className="flex items-center gap-x-4">
                <CosResourceUsageBar className="flex-1" progress={50} />
                <CosResourceUsageBar className="flex-1" progress={50} />
                <CosResourceUsageBar className="flex-1" progress={50} />
                <CosResourceUsageBar className="flex-1" progress={50} />
                <CosResourceUsageBar className="flex-1" progress={50} />
              </div>
            </div>
          </div>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Skeleton">
        <div className="flex flex-col gap-y-4">
          <CosResourceUsageBar.Skeleton />
          <CosResourceUsageBar.Skeleton className="w-[90px]" />
          <div className="flex items-center gap-x-4">
            <CosResourceUsageBar.Skeleton />
            <CosResourceUsageBar.Skeleton />
            <CosResourceUsageBar.Skeleton />
            <CosResourceUsageBar.Skeleton />
            <CosResourceUsageBar.Skeleton />
          </div>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
