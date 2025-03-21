import { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { CosBackButton } from '../../../components/CosBackButton/CosBackButton'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'

const meta = {
  title: 'Molecules/Back Button',
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
    href: '/',
    onClick: fn(),
    children: 'Previous Page',
  },
  render: (props) => {
    const { details, href, onClick, children } = props

    return (
      <StoryLayout title="Back Button">
        <StoryLayout.Section title="Layout">
          <div className="flex flex-col gap-y-12">
            <BackButtonRow title="Regular">
              <CosBackButton onClick={onClick} href={href}>
                {children}
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="Details">
              <CosBackButton details={details} href={href} onClick={onClick}>
                {children}
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
        <StoryLayout.Section title="Skeleton">
          <div className="flex flex-col gap-y-12">
            <BackButtonRow title="Regular">
              <CosBackButton onClick={onClick} href={href} loading={true}>
                {children}
              </CosBackButton>
            </BackButtonRow>
            <BackButtonRow title="Details">
              <CosBackButton
                details={details}
                href={href}
                loading={true}
                onClick={onClick}
              >
                {children}
              </CosBackButton>
            </BackButtonRow>
          </div>
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}
