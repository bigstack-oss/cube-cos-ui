import type { Meta, StoryObj } from '@storybook/react'
import { CosButton } from '../../../components/CosButton/CosButton'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { ButtonVariantTable } from './ButtonVariantTable'
import ButtonSkeletonTable from './ButtonSkeletonTable'

const meta = {
  title: 'Atoms/Button',
  component: CosButton,
  argTypes: {
    type: {
      control: { disable: true },
    },
    size: {
      control: { disable: true },
    },
    usage: {
      control: { disable: true },
    },
    loading: {
      control: { disable: true },
    },
    disabled: {
      control: { disable: true },
    },
    className: {
      control: { disable: true },
    },
    children: {
      control: { disabled: true },
    },
  },
} satisfies Meta<typeof CosButton>

export default meta

type ButtonStoryArgs = React.ComponentProps<typeof CosButton> & {
  buttonText: string
}

type Story = StoryObj<ButtonStoryArgs>

export const Gallery: Story = {
  args: {
    buttonText: 'Call to action',
  },
  render: (props: ButtonStoryArgs) => {
    const { buttonText } = props

    return (
      <StoryLayout
        title="Button"
        desc="Buttons allow users to take actions, and make choices, with a single tap."
      >
        <StoryLayout.Section title="Variants">
          <ButtonVariantTable buttonText={buttonText} />
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <ButtonSkeletonTable />
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
