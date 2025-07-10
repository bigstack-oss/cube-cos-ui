import { OperateNodeIpmiOperationEnum } from '@cube-frontend/api'
import { useState } from 'react'

type UseConfirmOperationModal = {
  desiredOperation: OperateNodeIpmiOperationEnum | undefined
  confirmationTitle: string
  confirmationText: string
  onOperationClick: (operation: OperateNodeIpmiOperationEnum) => void
  onConfirmModalClose: () => void
}

// TODO: Replace this map with i18n function.
const titleMap: Record<OperateNodeIpmiOperationEnum, string> = {
  [OperateNodeIpmiOperationEnum.Poweron]: 'Power On',
  [OperateNodeIpmiOperationEnum.Poweroff]: 'Power Off',
  [OperateNodeIpmiOperationEnum.Powercycle]: 'Power Cycle',
}

// TODO: Replace this function with i18n function.
const computeConfirmationText = (
  operation: OperateNodeIpmiOperationEnum,
  hostname: string,
): string => {
  const operationText = titleMap[operation].toLowerCase()
  return `Are you sure you want to ${operationText} node ${hostname}?`
}

export const useConfirmOperationModal = (
  hostname: string,
): UseConfirmOperationModal => {
  const [desiredOperation, setDesiredOperation] = useState<
    OperateNodeIpmiOperationEnum | undefined
  >(undefined)

  const getConfirmationTitle = () => {
    if (!desiredOperation) return ''
    return titleMap[desiredOperation]
  }

  const getConfirmationText = () => {
    if (!desiredOperation) return ''
    return computeConfirmationText(desiredOperation, hostname)
  }

  const onOperationClick = (operation: OperateNodeIpmiOperationEnum): void => {
    setDesiredOperation(operation)
  }

  const onConfirmModalClose = (): void => {
    setDesiredOperation(undefined)
  }

  return {
    desiredOperation,
    confirmationTitle: getConfirmationTitle(),
    confirmationText: getConfirmationText(),
    onOperationClick,
    onConfirmModalClose,
  }
}
