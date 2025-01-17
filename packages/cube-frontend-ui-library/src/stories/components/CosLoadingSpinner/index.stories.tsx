import { CosLoadingSpinner } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { SpinnerRow } from './SpinnerRow'

const meta = {
  component: CosLoadingSpinner,
} satisfies Meta<typeof CosLoadingSpinner>

export default meta

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <StoryLayout title="Loading Spinner">
      <StoryLayout.Section title="Dot">
        <div className="flex flex-col gap-y-8">
          <SpinnerRow title="45˚">
            <CosLoadingSpinner variant="dot45" />
          </SpinnerRow>
          <SpinnerRow title="120˚">
            <CosLoadingSpinner variant="dot120" />
          </SpinnerRow>
        </div>
      </StoryLayout.Section>
      <StoryLayout.Section title="Cube">
        <SpinnerRow title="Default">
          <CosLoadingSpinner variant="cube" />
        </SpinnerRow>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
