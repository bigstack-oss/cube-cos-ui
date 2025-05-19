import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { CosInformation } from '../../../components/CosInformation/CosInformation'

const meta = {
  title: 'Molecules/Information',
} satisfies Meta<typeof CosInformation>

export default meta

export const Gallery: StoryObj<typeof CosInformation> = {
  render: () => {
    return (
      <StoryLayout title="Information">
        <StoryLayout.Section title="Information">
          <div className="grid grid-cols-5 items-center gap-6 [&:not(:last-child)]:mb-6">
            <div className="primary-body2 col-span-1 font-medium">Master</div>
            <div className="col-span-4">
              <CosInformation>
                Information that remind user to keep in mind but not a
                temporarily notification.
              </CosInformation>
            </div>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Layout">
          <div className="grid grid-cols-5 items-center gap-6 [&:not(:last-child)]:mb-6">
            <div className="primary-body2 col-span-1 font-medium">w/Icon</div>
            <div className="col-span-4">
              <CosInformation showIcon={true}>
                Information that remind user to keep in mind but not a
                temporarily notification.
              </CosInformation>
            </div>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
