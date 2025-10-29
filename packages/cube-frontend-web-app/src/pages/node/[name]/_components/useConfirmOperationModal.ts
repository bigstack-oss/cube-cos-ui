import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { OperateNodeIpmiOperationEnum } from '@cube-frontend/api'

type UseConfirmOperationModal = {
  desiredOperation: OperateNodeIpmiOperationEnum | undefined
  confirmationTitle: string
  confirmationText: string
  onOperationClick: (operation: OperateNodeIpmiOperationEnum) => void
  onConfirmModalClose: () => void
}

type ModalTextMap = Record<
  OperateNodeIpmiOperationEnum,
  { title: string; message: string }
>

export const useConfirmOperationModal = (
  hostname: string,
): UseConfirmOperationModal => {
  const { t } = useTranslation()

  const [desiredOperation, setDesiredOperation] = useState<
    OperateNodeIpmiOperationEnum | undefined
  >(undefined)

  const textMap: ModalTextMap = {
    [OperateNodeIpmiOperationEnum.Poweron]: {
      title: t('nodes.details.actionModal.powerOn.title'),
      message: t('nodes.details.actionModal.powerOn.message', { hostname }),
    },
    [OperateNodeIpmiOperationEnum.Poweroff]: {
      title: t('nodes.details.actionModal.powerOff.title'),
      message: t('nodes.details.actionModal.powerOff.message', { hostname }),
    },
    [OperateNodeIpmiOperationEnum.Powercycle]: {
      title: t('nodes.details.actionModal.powerCycle.title'),
      message: t('nodes.details.actionModal.powerCycle.message', { hostname }),
    },
  }
  const computeConfirmationText = (
    operation: OperateNodeIpmiOperationEnum,
  ): string => {
    return textMap[operation].message
  }

  const getConfirmationTitle = () => {
    if (!desiredOperation) return ''
    return textMap[desiredOperation].title
  }

  const getConfirmationText = () => {
    if (!desiredOperation) return ''
    return computeConfirmationText(desiredOperation)
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
