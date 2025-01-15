import type { Meta, StoryObj } from '@storybook/react'
import { Button, CubeButtonSize } from '../../../components/Button/Button'
import ButtonSkeleton from '../../../components/Button/ButtonSkeleton'

const meta = {
  component: Button,
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof Button>

const buttonText = 'Call to action'

const SizeBlocks = (props: { title: string; size: CubeButtonSize }) => {
  const { title, size } = props

  return (
    <div className="flex flex-row items-center space-x-4">
      <span className="font-inter text-primary-h3">{title}</span>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <span className="w-12 font-inter text-primary-body3">Default</span>
          <Button size={size} variant="primary">
            {buttonText}
          </Button>
          <Button size={size} variant="secondary">
            {buttonText}
          </Button>
          <Button size={size} variant="ghost">
            {buttonText}
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="w-12 font-inter text-primary-body3">Disable</span>
          <Button size={size} variant="primary" disabled>
            {buttonText}
          </Button>
          <Button size={size} variant="secondary" disabled>
            {buttonText}
          </Button>
          <Button size={size} variant="ghost" disabled>
            {buttonText}
          </Button>
        </div>
        <div className="flex items-center space-x-4">
          <span className="w-12 font-inter text-primary-body3">Skeleton</span>
          <ButtonSkeleton size={size} />
          <ButtonSkeleton size={size} />
          <ButtonSkeleton size={size} />
        </div>
      </div>
    </div>
  )
}

export const Gallery: StoryObj = {
  args: {},
  render: () => (
    <div className="flex flex-col gap-y-4">
      <SizeBlocks title="SM" size="sm" />
      <SizeBlocks title="MD" size="md" />
      <SizeBlocks title="LG" size="lg" />
    </div>
  ),
}

export const Primary: Story = {
  args: {
    variant: 'primary',
    disabled: false,
    children: buttonText,
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
    disabled: false,
    children: buttonText,
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
    disabled: false,
    children: buttonText,
  },
}
