import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import Power from '@cube-frontend/ui-library/icons/monochrome/power.svg?react'
import { useState } from 'react'

export const ActionOverflowMenu = () => {
  const [isToggleOn, setIsToggleOn] = useState(true)

  const onItemClick = () => {
    alert('Item clicked')
  }

  const renderFirstSection = () => (
    <>
      <CosOverflowMenu.Title>Catalog Title</CosOverflowMenu.Title>
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
    </>
  )

  const renderToggles = () => (
    <>
      <CosOverflowMenu.Item
        type="toggle"
        title="Option Title 1"
        boldTitle={true}
        subText="Subtext"
        isOn={isToggleOn}
        onChange={setIsToggleOn}
      />
      <CosOverflowMenu.Item
        type="toggle"
        title="Option Title 2"
        subText="Subtext"
        isOn={false}
        disabled={true}
      />
    </>
  )

  const renderThirdSection = () => (
    <>
      <CosOverflowMenu.Title>Catalog Title</CosOverflowMenu.Title>
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
    </>
  )

  const renderFourthSection = () => (
    <>
      <CosOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 1"
        boldTitle={true}
        TrailingIcon={Power}
        onClick={onItemClick}
      />
      <CosOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 2"
        subText="No click event attached"
        TrailingIcon={Power}
      />
      <CosOverflowMenu.Item
        type="trailing-icon"
        title="Option Title 3"
        TrailingIcon={Power}
        disabled={true}
        onClick={onItemClick}
      />
    </>
  )

  return (
    <CosOverflowMenu
      triggerElement={
        <CosButton className="w-[70px]" usage="text-only">
          Action
        </CosButton>
      }
    >
      {renderFirstSection()}
      <CosOverflowMenu.Divider />
      {renderToggles()}
      <CosOverflowMenu.Divider />
      {renderThirdSection()}
      <CosOverflowMenu.Divider />
      {renderFourthSection()}
    </CosOverflowMenu>
  )
}
