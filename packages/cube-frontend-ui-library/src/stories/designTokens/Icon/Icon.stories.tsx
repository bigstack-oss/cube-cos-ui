import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { twMerge } from 'tailwind-merge'
import { CosIconFrame } from '../../../components/CosIcon/CosIcon'
import Home01 from '../../../components/CosIcon/monochrome/home_01.svg?react'
import Warning from '../../../components/CosIcon/monochrome/warning.svg?react'
import { CosIconText } from '../../../components/CosIconText/CosIconText'
import { StoryLayout } from '../../../internal/components/StoryLayout/StoryLayout'
import { IconGallery } from './IconGallery'
import { coloredIcons, monochromeIcons, renderSizeRow } from './utils'

const meta = {
  title: 'Design Tokens/Icon',
  component: CosIconFrame,
  args: {
    onClick: fn(),
  },
  argTypes: {
    children: {
      control: false,
    },
    className: {
      description:
        'Only `bg-.*` and `text-.*` classes are allowed in storybook, but you can use any class in your project.',
    },
  },
} satisfies Meta<typeof CosIconFrame>

export default meta

type Story = StoryObj<React.ComponentProps<typeof CosIconFrame>>

export const MonochromeIconGallery: Story = {
  args: {
    className: twMerge('text-functional-text'),
  },
  render: (props) => {
    const { size, className, onClick } = props
    return (
      <IconGallery
        title="Monochrome Icon Gallery"
        desc="A collection of all available monochrome icons"
        size={size}
        className={className}
        icons={monochromeIcons}
        onIconClick={onClick}
      />
    )
  },
}

export const ColoredIconGallery: Story = {
  argTypes: {
    className: {
      control: false,
    },
  },
  render: (props) => {
    const { size, onClick } = props
    return (
      <IconGallery
        title="Colored Icon Gallery"
        desc="A collection of all available colored icons"
        size={size}
        icons={coloredIcons}
        onIconClick={onClick}
      />
    )
  },
}

export const Size: Story = {
  args: {
    className: twMerge('text-functional-text'),
  },
  argTypes: {
    size: {
      table: {
        disable: true,
      },
    },
  },
  render: (props) => {
    const { className, onClick } = props

    return (
      <StoryLayout title="Icon Size">
        <StoryLayout.Section title="Without Frame">
          {renderSizeRow(
            'Extra Small',
            <Home01
              className={twMerge('icon-xs', className)}
              onClick={onClick}
            />,
          )}
          {renderSizeRow(
            'Small',
            <Home01
              className={twMerge('icon-sm', className)}
              onClick={onClick}
            />,
          )}
          {renderSizeRow(
            'Medium-Small',
            <Home01
              className={twMerge('icon-md-sm', className)}
              onClick={onClick}
            />,
          )}
          {renderSizeRow(
            'Medium',
            <Home01
              className={twMerge('icon-md', className)}
              onClick={onClick}
            />,
          )}
          {renderSizeRow(
            'Large',
            <Home01
              className={twMerge('icon-lg', className)}
              onClick={onClick}
            />,
          )}
          {renderSizeRow(
            'Extra Large',
            <Home01
              className={twMerge('icon-xl', className)}
              onClick={onClick}
            />,
          )}
        </StoryLayout.Section>
        <StoryLayout.Section title="With Frame">
          {renderSizeRow(
            'Extra Small',
            <CosIconFrame size="xs" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
          {renderSizeRow(
            'Small',
            <CosIconFrame size="sm" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
          {renderSizeRow(
            'Medium-Small',
            <CosIconFrame size="md-sm" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
          {renderSizeRow(
            'Medium',
            <CosIconFrame size="md" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
          {renderSizeRow(
            'Large',
            <CosIconFrame size="lg" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
          {renderSizeRow(
            'Extra Large',
            <CosIconFrame size="xl" className={className} onClick={onClick}>
              <Warning />
            </CosIconFrame>,
          )}
        </StoryLayout.Section>
      </StoryLayout>
    )
  },
}

export const Text: Story = {
  render: () => (
    <StoryLayout title="Text">
      <StoryLayout.Section title="Master">
        <div className="flex items-center gap-x-3">
          <CosIconText type="primary">new</CosIconText>
          <CosIconText type="warning">warning</CosIconText>
          <CosIconText type="warning">expiring</CosIconText>
          <CosIconText type="error">expired</CosIconText>
          <CosIconText type="error">error</CosIconText>
          <CosIconText type="error">NG</CosIconText>
          <CosIconText type="functional">non-reserved</CosIconText>
          <CosIconText type="secondary">reserved</CosIconText>
          <CosIconText type="positive">OK</CosIconText>
          <CosIconText type="primary-outline">Admin</CosIconText>
        </div>
      </StoryLayout.Section>
    </StoryLayout>
  ),
}
