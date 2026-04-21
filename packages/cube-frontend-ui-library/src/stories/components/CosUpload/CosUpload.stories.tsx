import { CosUpload } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { DisabledExample } from './DisabledExample'
import { ErrorExample } from './ErrorExample'
import { MasterExample } from './MasterExample'
import { ModalExample } from './ModalExample'
import { UploadedExample } from './UploadedExample'
import { UploadGrid } from './UploadGrid'
import { UploadingExample } from './UploadingExample'

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
          <MasterExample />
        </UploadGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Status">
        <UploadGrid title="Uploading">
          <UploadingExample />
        </UploadGrid>
        <UploadGrid title="Uploaded">
          <UploadedExample />
        </UploadGrid>
        <UploadGrid title="Error">
          <ErrorExample />
        </UploadGrid>
        <UploadGrid title="Disabled">
          <DisabledExample />
        </UploadGrid>
      </StoryLayout.Section>
      <StoryLayout.Section title="Mockup">
        <UploadGrid title="Default">
          <ModalExample defaultIsTesting={false} defaultIsUploaded={false} />
        </UploadGrid>
        <UploadGrid title="Uploaded">
          <ModalExample defaultIsTesting={false} defaultIsUploaded={true} />
        </UploadGrid>
        <UploadGrid title="Testing">
          <ModalExample defaultIsTesting={true} defaultIsUploaded={true} />
        </UploadGrid>
      </StoryLayout.Section>
    </StoryLayout>
  )
}
