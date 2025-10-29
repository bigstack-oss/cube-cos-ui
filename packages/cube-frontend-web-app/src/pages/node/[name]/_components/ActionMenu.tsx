import { useTranslation } from 'react-i18next'
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

  const { t } = useTranslation()

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
          {t('nodes.details.action')}
        </CosButton>
      }
    >
      <CosOverflowMenu.Title>
        {t('nodes.details.action.basic')}
      </CosOverflowMenu.Title>
      <CosOverflowMenu.Item
        type="plain"
        title={t('nodes.details.action.createSupportFiles')}
        disabled={!canCreateSupportFile(node)}
        onClick={onCreateSupportFileClick}
      />
      {node.ipmi.isConnected && (
        <>
          <CosOverflowMenu.Divider />
          <CosOverflowMenu.Title>
            {t('nodes.details.action.ipmiControl')}
          </CosOverflowMenu.Title>
          {showPowerCycle && (
            <CosOverflowMenu.Item
              type="plain"
              title={t('nodes.details.action.powerCycle')}
              onClick={() =>
                onOperationClick(OperateNodeIpmiOperationEnum.Powercycle)
              }
            />
          )}
          {showPowerOn && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title={t('nodes.details.action.powerOn')}
              TrailingIcon={Power}
              onClick={() =>
                onOperationClick(OperateNodeIpmiOperationEnum.Poweron)
              }
            />
          )}
          {showPowerOff && (
            <CosOverflowMenu.Item
              type="trailing-icon"
              title={t('nodes.details.action.powerOff')}
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
        actionText={t('nodes.details.actionModal.confirm')}
        onActionClick={onOperationConfirmed}
        onCloseClick={onConfirmModalClose}
      >
        <p className="primary-body2 text-functional-text">{confirmationText}</p>
      </CosModal>
    </CosOverflowMenu>
  )
}
