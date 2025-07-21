import { CosModal } from '@cube-frontend/ui-library'
import { nodesApi } from '@cube-frontend/web-app/api/cosApi'
import { DataCenterContext } from '@cube-frontend/web-app/context/DataCenterContext'
import { useContext, useState } from 'react'
import { DeviceRow } from './nodeDevicesUtils'

type RestartOSDsModalProps = {
  nodeName: string | undefined
  isOpen: boolean
  targetRow: DeviceRow | undefined
  onAccepted: () => void
  onCloseClick: () => void
}

export const RestartOSDsModal = (props: RestartOSDsModalProps) => {
  const { nodeName, isOpen, targetRow, onAccepted, onCloseClick } = props

  const { dataCenter } = useContext(DataCenterContext)

  const [isLoading, setIsLoading] = useState(false)

  const onActionClick = async (): Promise<void> => {
    if (!nodeName || !targetRow) return
    setIsLoading(true)
    try {
      const promises: Promise<unknown>[] = targetRow.osd.daemons.map((daemon) =>
        nodesApi.restartNodeOsd({
          dataCenter: dataCenter!.name,
          nodeName,
          osdId: daemon.id,
        }),
      )
      await Promise.all(promises)
      setIsLoading(false)
      onAccepted()
    } catch (error) {
      console.error('Restart OSDs error: ', error)
      setIsLoading(false)
    }
  }

  return (
    <CosModal
      isOpen={isOpen}
      size="sm"
      title="Restart OSDs"
      actionText="Restart OSDs"
      actionButtonProps={{
        loading: isLoading,
      }}
      onActionClick={onActionClick}
      onCloseClick={onCloseClick}
    >
      <p className="primary-body2 text-functional-text">
        Do you want to restart the OSDs for{' '}
        <span className="font-bold">{targetRow?.device}</span>?
      </p>
    </CosModal>
  )
}
