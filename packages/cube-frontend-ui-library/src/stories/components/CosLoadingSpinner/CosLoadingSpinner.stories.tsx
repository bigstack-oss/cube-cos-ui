import { CosLoadingSpinner } from '@cube-frontend/ui-library'
import type { Meta, StoryObj } from '@storybook/react'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { SpinnerRow } from './SpinnerRow'
import { PropsWithClassName } from '@cube-frontend/utils'

const meta = {
  title: 'Atoms/LoadingSpinner',
  component: CosLoadingSpinner,
  argTypes: {
    variant: {
      control: { disable: true },
    },
    className: {
      control: {
        type: 'text',
      },
    },
  },
} satisfies Meta<typeof CosLoadingSpinner>

export default meta

export const Gallery: StoryObj<PropsWithClassName> = {
  args: {},
  render: (props) => {
    const { className } = props

    return (
      <StoryLayout title="Loading Spinner">
        <StoryLayout.Section title="Dot">
          <div className="flex flex-col gap-y-8">
            <SpinnerRow title="45˚">
              <CosLoadingSpinner variant="dot45" className={className} />
            </SpinnerRow>
            <SpinnerRow title="120˚">
              <CosLoadingSpinner variant="dot120" className={className} />
            </SpinnerRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Cube">
          <SpinnerRow title="Default">
            <CosLoadingSpinner variant="cube" className={className} />
          </SpinnerRow>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
