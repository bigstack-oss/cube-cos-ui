import { ComponentType, createElement, PropsWithChildren } from 'react'
import { CosButton } from '../CosButton/CosButton'
import { SvgComponent } from '../CosIcon/CosIcon'
import { CosTooltip } from '../CosTooltip/CosTooltip'

export type FunctionBarProps = {
  items: FunctionBarItem[]
}

export type FunctionBarItem<
  ContainerProps extends PropsWithChildren = PropsWithChildren,
> = {
  Icon: SvgComponent
  hoverMessage?: string
  onClick?: () => void
  container?: {
    Component: ComponentType<ContainerProps>
    props: ContainerProps
  }
}

export const FunctionBar = (props: FunctionBarProps) => {
  const { items } = props

  const renderItem = (item: (typeof items)[number]) => {
    const { Icon, onClick, container } = item

    const button = (
      <CosButton
        size="md"
        type="ghost"
        usage="icon-only"
        Icon={Icon}
        onClick={onClick}
      />
    )

    if (!container) {
      return button
    }

    return createElement(container.Component, container.props, button)
  }

  return (
    <div className="flex flex-row items-center">
      {items.map((item, index) => (
        <CosTooltip
          key={index}
          hoverContent={
            item.hoverMessage ? { message: item.hoverMessage } : undefined
          }
        >
          {renderItem(item)}
        </CosTooltip>
      ))}
    </div>
  )
}
