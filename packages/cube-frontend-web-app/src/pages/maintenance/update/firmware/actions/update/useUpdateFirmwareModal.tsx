import {
  GetFirmwareUpgradeProgressResponseDataProgressesInnerStatusCurrentEnum as FirmwareStatus,
  ListFirmwaresResponseData,
} from '@cube-frontend/api'
import { CosModalProps } from '@cube-frontend/ui-library'
import { ReactNode, useMemo, useState } from 'react'
import { mockUpdatableNodes, mockUpdateProgresses } from '../../mockFirmware'
import { NodeUpdate } from './NodeUpdate'
import { UpdatableNodes } from './UpdatableNodes'
import { UpdateModalStep } from './updateActionUtils'

const DONE_STATES: Set<FirmwareStatus> = new Set([
  // @ts-expect-error: firmware is still under development, some types are not finalized yet.
  // This will be fixed once the frontend integration with the backend is complete.
  FirmwareStatus.Installed,
  FirmwareStatus.Resolved,
])

type UseUpdateFirmwareModal = {
  firmwareVersionToUpdate: string | undefined
  showUpdateFirmwareModal: (version: string) => void
  closeUpdateFirmwareModal: () => void

  updateModalTitle: string
  updateModalContent: () => ReactNode
  updateModalActionProps: Pick<
    CosModalProps,
    'actionText' | 'onActionClick' | 'actionButtonProps'
  >
}

export const useUpdateFirmwareModal = (
  listFirmwares: () => Promise<ListFirmwaresResponseData>,
): UseUpdateFirmwareModal => {
  const [firmwareVersionToUpdate, setFirmwareVersionToUpdate] = useState<
    string | undefined
  >(undefined)

  const [currentStep, setCurrentStep] =
    useState<UpdateModalStep>('updatableNodes')

  const [isRolling, setIsRolling] = useState(false)

  const updatableNodeRows = useMemo(() => {
    return mockUpdatableNodes.map((node) => ({ ...node, id: node.name }))
  }, [])

  const upgradeProgressRows = useMemo(() => {
    return mockUpdateProgresses.progresses.map((progress) => ({
      ...progress,
      id: progress.host,
    }))
  }, [])

  const isFirmwareUpdateDone = useMemo((): boolean => {
    if (!upgradeProgressRows.length) return false
    return upgradeProgressRows.every(
      (progress) =>
        !progress.status.isProcessing &&
        DONE_STATES.has(progress.status.current),
    )
  }, [upgradeProgressRows])

  const showUpdateFirmwareModal = (version: string): void => {
    setFirmwareVersionToUpdate(version)
  }

  const closeUpdateFirmwareModal = (): void => {
    setIsRolling(false)
    setCurrentStep('updatableNodes')
    setFirmwareVersionToUpdate(undefined)
  }

  const modalTitleMap: Record<UpdateModalStep, string> = {
    updatableNodes: 'Firmware Update',
    rollingUpdating: 'Firmware Updating (Rolling)',
    nonRollingUpdating: 'Firmware Updating (Non-Rolling)',
    rebootCluster: 'Reboot Cluster',
  }

  const modalContentMap: Record<UpdateModalStep, () => ReactNode> = {
    updatableNodes: () => (
      <UpdatableNodes
        updatableNodeRows={updatableNodeRows}
        isRolling={isRolling}
        onIsRollingCheck={() => setIsRolling((prev) => !prev)}
      />
    ),
    rollingUpdating: () => (
      <NodeUpdate
        isRolling={isRolling}
        upgradeProgressRows={upgradeProgressRows}
      />
    ),
    nonRollingUpdating: () => (
      <NodeUpdate
        isRolling={isRolling}
        upgradeProgressRows={upgradeProgressRows}
      />
    ),
    rebootCluster: () => (
      <div className="primary-body3 text-functional-title">
        Please be aware that selecting{' '}
        <span className="font-semibold">Reboot</span> will make the system
        unavailable for some time.
      </div>
    ),
  }

  const modalActionPropsMap: Record<
    UpdateModalStep,
    Pick<CosModalProps, 'actionText' | 'onActionClick' | 'actionButtonProps'>
  > = {
    updatableNodes: {
      actionText: 'Yes, update',
      onActionClick: () => {
        setCurrentStep(isRolling ? 'rollingUpdating' : 'nonRollingUpdating')
      },
    },
    rollingUpdating: {
      actionText: 'Done',
      onActionClick: () => {
        listFirmwares()
        closeUpdateFirmwareModal()
      },
      actionButtonProps: { disabled: !isFirmwareUpdateDone },
    },
    nonRollingUpdating: {
      actionText: 'Reboot Cluster',
      onActionClick: () => {
        setCurrentStep('rebootCluster')
      },
      actionButtonProps: { disabled: !isFirmwareUpdateDone },
    },
    rebootCluster: {
      actionText: 'Yes, reboot',
      onActionClick: () => {
        listFirmwares()
        closeUpdateFirmwareModal()
      },
    },
  }

  return {
    firmwareVersionToUpdate,
    showUpdateFirmwareModal,
    closeUpdateFirmwareModal,
    updateModalTitle: modalTitleMap[currentStep],
    updateModalContent: modalContentMap[currentStep],
    updateModalActionProps: modalActionPropsMap[currentStep],
  }
}
