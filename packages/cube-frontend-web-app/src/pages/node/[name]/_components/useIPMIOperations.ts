import {
  Node,
  NodeStatusEnum,
  OperateNodeIpmiOperationEnum,
} from '@cube-frontend/api'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { isInPoweringStatus } from '@cube-frontend/web-app/utils/node'
import { useContext, useState } from 'react'

type UseIPMIOperations = {
  isIPMIOperating: boolean
  isInPoweringStatus: boolean
  showPowerOn: boolean
  showPowerOff: boolean
  showPowerCycle: boolean
  powerOn: () => Promise<void>
  powerOff: () => Promise<void>
  powerCycle: () => Promise<void>
}

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
        nodeName: node!.hostname,
        operation,
      })
    } catch (error) {
      console.error(`Node ${operation} error: `, error)
    } finally {
      setIsIPMIOperating(false)
    }
  }

  const powerOn = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Poweron)
  }

  const powerOff = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Poweroff)
  }

  const powerCycle = async (): Promise<void> => {
    await operate(OperateNodeIpmiOperationEnum.Powercycle)
  }

  return {
    isIPMIOperating,
    isInPoweringStatus: isInPoweringStatus(node),
    showPowerOn: node?.status === NodeStatusEnum.Down,
    showPowerOff: node?.status === NodeStatusEnum.Up,
    showPowerCycle: node?.status === NodeStatusEnum.Up,
    powerOn,
    powerOff,
    powerCycle,
  }
}
