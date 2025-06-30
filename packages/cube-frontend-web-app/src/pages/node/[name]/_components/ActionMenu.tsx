import { Node } from '@cube-frontend/api'
import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import Power from '@cube-frontend/ui-library/icons/monochrome/power.svg?react'
import { useIPMIOperations } from './useIPMIOperations'

type ActionMenuProps = {
  node: Node
  onCreateSupportFileClick: () => void
}

export const ActionMenu = (props: ActionMenuProps) => {
  const { node, onCreateSupportFileClick } = props

  const {
    isIPMIOperating,
    isInPoweringStatus,
    showPowerOn,
    showPowerOff,
    showPowerCycle,
    onPowerOnClick,
    onPowerOffClick,
    onPowerCycleClick,
  } = useIPMIOperations(node)

  return (
    <CosOverflowMenu
      triggerElement={
        <CosButton loading={isIPMIOperating} disabled={isInPoweringStatus}>
          Action
        </CosButton>
      }
    >
      <CosOverflowMenu.Title>Basic</CosOverflowMenu.Title>
      <CosOverflowMenu.Item
        type="plain"
        title="Create support file"
        onClick={onCreateSupportFileClick}
      />
      {node.ipmi.isConnected && (
        <>
          <CosOverflowMenu.Divider />
          <CosOverflowMenu.Title>IPMI Control</CosOverflowMenu.Title>
          {showPowerCycle && (
            <CosOverflowMenu.Item
              type="plain"
              title="Power cycle"
              onClick={onPowerCycleClick}
            />
          )}
          {showPowerOn && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title="Power on"
              TrailingIcon={Power}
              onClick={onPowerOnClick}
            />
          )}
          {showPowerOff && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title="Power off"
              TrailingIcon={Power}
              onClick={onPowerOffClick}
            />
          )}
        </>
      )}
    </CosOverflowMenu>
  )
}
