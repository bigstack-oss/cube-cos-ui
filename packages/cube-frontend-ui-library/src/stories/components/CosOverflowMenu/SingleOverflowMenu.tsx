import { CosOverflowMenu } from '@cube-frontend/ui-library'
import Home01 from '@cube-frontend/ui-library/icons/monochrome/home_01.svg?react'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

export const SingleOverflowMenu = () => {
  const onItemClick = () => {
    alert('Item clicked')
  }

  return (
    <CosOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CosOverflowMenu.Title>Catalog Title</CosOverflowMenu.Title>
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
    </CosOverflowMenu>
  )
}
