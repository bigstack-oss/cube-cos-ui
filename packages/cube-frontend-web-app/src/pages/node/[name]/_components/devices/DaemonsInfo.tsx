import { CosIconText, CosIconTextType } from '@cube-frontend/ui-library'
import { NodeBlockDeviceInnerWaitingForApiUpdate } from './nodeDevicesUtils'

type DaemonsInfoProps = {
  daemons: NodeBlockDeviceInnerWaitingForApiUpdate['osd']['daemons']
}

export const DaemonsInfo = (props: DaemonsInfoProps) => {
  const { daemons } = props

  const computeIconType = (status: string): CosIconTextType => {
    if (status === 'up') return 'positive'
    if (status === 'down') return 'error'
    return 'functional'
  }

  return (
    <div className="flex flex-col gap-y-1.5">
      {daemons.map((daemon) => (
        <div key={daemon.id} className="flex items-center gap-x-1.5">
          <span className="primary-body4 text-functional-text">
            {daemon.id}
          </span>
          <CosIconText type={computeIconType(daemon.status.current)}>
            {daemon.status.current}
          </CosIconText>
        </div>
      ))}
    </div>
  )
}
