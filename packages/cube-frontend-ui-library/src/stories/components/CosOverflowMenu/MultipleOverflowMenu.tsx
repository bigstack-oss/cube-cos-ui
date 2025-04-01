import { CosOverflowMenu } from '@cube-frontend/ui-library'
import Home01 from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

export const MultipleOverflowMenu = () => {
  const onItemClick = () => {
    alert('Item clicked')
  }

  return (
    <CosOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CosOverflowMenu.Title>Catalog Title 1</CosOverflowMenu.Title>
      <CosOverflowMenu.Item
        type="menu-icon"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        MenuIcon={Home01}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="menu-icon"
        title="Option Title 2"
        subText="Subtext"
        MenuIcon={Home01}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="menu-icon"
        title="Option Title 3"
        subText="Subtext"
        MenuIcon={Home01}
        disabled={true}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Divider />
      <CosOverflowMenu.Title>Catalog Title 2</CosOverflowMenu.Title>
      <CosOverflowMenu.Item
        type="plain"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="plain"
        title="Option Title 2"
        subText="Subtext"
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="plain"
        title="Option Title 3"
        subText="Subtext"
        disabled={true}
        onClick={onItemClick}
      />
    </CosOverflowMenu>
  )
}
