import {
  Node,
  NodeStatusEnum,
  OperateNodeIpmiOperationEnum,
} from '@cube-frontend/api'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useState } from 'react'

type UseIPMIOperations = {
  isIPMIOperating: boolean
  isInPoweringStatus: boolean
  showPowerOn: boolean
  showPowerOff: boolean
  showPowerCycle: boolean
  onPowerOnClick: () => Promise<void>
  onPowerOffClick: () => Promise<void>
  onPowerCycleClick: () => Promise<void>
}

const poweringStatuses = new Set<NodeStatusEnum>([
  NodeStatusEnum.PoweringOn,
  NodeStatusEnum.PoweringOff,
  NodeStatusEnum.PoweringCycle,
])

export const useIPMIOperations = (
  node: Node | undefined,
): UseIPMIOperations => {
  const { dataCenter } = useContext(DataCenterContext)

  const [isIPMIOperating, setIsIPMIOperating] = useState(false)

  const operate = async (
    operation: OperateNodeIpmiOperationEnum,
  ): Promise<void> => {
    setIsIPMIOperating(true)
    try {
      await nodesApi.operateNodeIpmi({
        dataCenter: dataCenter!.name,
        nodeName: node?.hostname ?? '',
        operation,
      })
    } catch (error) {
      console.error(`Node ${operation} error: `, error)
    } finally {
      setIsIPMIOperating(false)
    }
  }

  const onPowerOnClick = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Poweron)
  }

  const onPowerOffClick = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Poweroff)
  }

  const onPowerCycleClick = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Powercycle)
  }

  return {
    isIPMIOperating,
    isInPoweringStatus: !!node && poweringStatuses.has(node?.status),
    showPowerOn: node?.status === NodeStatusEnum.Down,
    showPowerOff: node?.status === NodeStatusEnum.Up,
    showPowerCycle: node?.status === NodeStatusEnum.Up,
    onPowerOnClick,
    onPowerOffClick,
    onPowerCycleClick,
  }
}
