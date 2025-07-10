import { Node, OperateNodeIpmiOperationEnum } from '@cube-frontend/api'
import { CosButton, CosModal, CosOverflowMenu } from '@cube-frontend/ui-library'
import Power from '@cube-frontend/ui-library/icons/monochrome/power.svg?react'
import { canCreateSupportFile } from '@cube-frontend/web-app/utils/node'
import { useConfirmOperationModal } from './useConfirmOperationModal'
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
    powerOn,
    powerOff,
    powerCycle,
  } = useIPMIOperations(node)

  const {
    desiredOperation,
    confirmationTitle,
    confirmationText,
    onOperationClick,
    onConfirmModalClose,
  } = useConfirmOperationModal(node.hostname)

  const onOperationConfirmed = () => {
    if (desiredOperation === OperateNodeIpmiOperationEnum.Poweron) {
      powerOn()
    } else if (desiredOperation === OperateNodeIpmiOperationEnum.Poweroff) {
      powerOff()
    } else if (desiredOperation === OperateNodeIpmiOperationEnum.Powercycle) {
      powerCycle()
    } else {
      throw new Error(`Unhandled operation ${desiredOperation}`)
    }
    onConfirmModalClose()
  }

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
        disabled={!canCreateSupportFile(node)}
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
              onClick={() =>
                onOperationClick(OperateNodeIpmiOperationEnum.Powercycle)
              }
            />
          )}
          {showPowerOn && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title="Power on"
              TrailingIcon={Power}
              onClick={() =>
                onOperationClick(OperateNodeIpmiOperationEnum.Poweron)
              }
            />
          )}
          {showPowerOff && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title="Power off"
              TrailingIcon={Power}
              onClick={() =>
                onOperationClick(OperateNodeIpmiOperationEnum.Poweroff)
              }
            />
          )}
        </>
      )}
      <CosModal
        title={confirmationTitle}
        size="sm"
        isOpen={!!desiredOperation}
        actionText="Confirm"
        onActionClick={onOperationConfirmed}
        onCloseClick={onConfirmModalClose}
      >
        <p className="primary-body2 text-functional-text">{confirmationText}</p>
      </CosModal>
    </CosOverflowMenu>
  )
}
