import { CosUpload } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { Upload } from './Upload'
import { UploadGrid } from './UploadGrid'

const meta = {
  title: 'Organisms/Upload',
  component: CosUpload,
} satisfies Meta<typeof CosUpload>

export default meta

export const Gallery: StoryObj = {
  render: () => <TooltipGallery />,
}

const TooltipGallery = () => {
  return (
    <StoryLayout title="Upload Section">
      <StoryLayout.Section title="Upload Section">
        <UploadGrid title="Master">
          <Upload isLoading={false} isUploaded={true} isError={false} />
        </UploadGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Status">
        <UploadGrid title="Default">
          <Upload isLoading={false} isUploaded={false} isError={false} />
        </UploadGrid>
        <UploadGrid title="Error Message">
          <Upload isLoading={false} isUploaded={false} isError={true} />
        </UploadGrid>
        <UploadGrid title="Uploaded">
          <Upload isLoading={false} isUploaded={true} isError={false} />
        </UploadGrid>
        <UploadGrid title="Disabled">
          <Upload isLoading={true} isUploaded={true} isError={false} />
        </UploadGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Mockup">
        <UploadGrid title="Default">
          <Upload
            isLoading={false}
            isUploaded={false}
            insideModal={true}
            isError={false}
          />
        </UploadGrid>
        <UploadGrid title="Uploaded">
          <Upload
            isLoading={false}
            isUploaded={true}
            insideModal={true}
            isError={false}
          />
        </UploadGrid>
        <UploadGrid title="Testing">
          <Upload
            isLoading={true}
            isUploaded={true}
            insideModal={true}
            isError={false}
          />
        </UploadGrid>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
