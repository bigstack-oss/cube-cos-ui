import type { Meta, StoryObj } from '@storybook/react'
import { Children, PropsWithChildren } from 'react'
import { CaretLeft } from '../components/Icon/CaretLeft'
import { Home01 } from '../components/Icon/Home01'
import { X } from '../components/Icon/X'
import { IconSize } from '../components/Icon/iconUtils'

const meta = {} satisfies Meta

export default meta

type IconGridProps = PropsWithChildren<{
  title: string
}>

const IconGrid = (props: IconGridProps) => {
  const { title, children } = props

  const iconsWithFrames = Children.toArray(children).map((node, index) => (
    <span key={index} className="p-2.5 text-functional-text">
      {node}
    </span>
  ))

  return (
    <div className="flex gap-x-2">
      <h3 className="mt-2 w-[100px] font-inter text-secondary-h5 text-functional-text">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">{iconsWithFrames}</div>
    </div>
  )
}

export const Gallery: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-y-10">
      <IconGrid title="Arrow">
        <CaretLeft />
      </IconGrid>
      <IconGrid title="Action">
        <X />
      </IconGrid>
      <IconGrid title="Menu">
        <Home01 />
      </IconGrid>
    </div>
  ),
}

const renderSizeRow = (title: string, size: IconSize) => (
  <div className="flex items-center">
    <h3 className="w-[120px] font-inter text-secondary-h5 text-functional-text">
      {title}
    </h3>
    <Home01 className="text-functional-text" size={size} />
  </div>
)

export const Size: StoryObj = {
  render: () => (
    <div className="flex flex-col gap-y-6">
      {renderSizeRow('Small', 'sm')}
      {renderSizeRow('Medium', 'md')}
      {renderSizeRow('Large', 'lg')}
      {renderSizeRow('Extra Large', 'xl')}
    </div>
  ),
}
