import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { CosBackButton } from '../../../components/CosBackButton/CosBackButton'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Molecules/BackButton',
  component: CosBackButton,
  argTypes: {
    loading: {
      control: { disable: true },
    },
  },
} satisfies Meta<typeof CosBackButton>

export default meta

type Story = StoryObj<typeof meta>

type BackButtonRowProps = {
  title: string
  children: React.ReactNode
}

const BackButtonRow = (props: BackButtonRowProps) => {
  const { title, children } = props

  return (
    <div className="flex flex-row items-center gap-x-10">
      <span className="primary-body2 w-20 font-semibold">{title}</span>
      {children}
    </div>
  )
}

export const Gallery: Story = {
  args: {
    details: 'Link Details',
    children: 'Previous Page',
    onClick: fn(),
  },
  render: (props) => {
    const { details, children, onClick } = props

    return (
      <StoryLayout title="Back Button">
        <StoryLayout.Section title="Layout">
          <div className="flex flex-col gap-y-12">
            <BackButtonRow title="Regular">
              <CosBackButton onClick={onClick}>{children}</CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="Details">
              <CosBackButton details={details} onClick={onClick}>
                {children}
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-12">
            <BackButtonRow title="Regular">
              <CosBackButton onClick={onClick} loading={true}>
                {children}
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="Details">
              <CosBackButton details={details} loading={true} onClick={onClick}>
                {children}
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
