import {
  ListNodeDevicesResponseDataInnerOsdDaemonsInner,
  ListNodeDevicesResponseDataInnerOsdDaemonsInnerStatusCurrentEnum,
} from '@cube-frontend/api'
import { CosIconText, CosIconTextType } from '@cube-frontend/ui-library'

type DaemonsInfoProps = {
  daemons: ListNodeDevicesResponseDataInnerOsdDaemonsInner[]
}

const iconTypeMap: Record<
  ListNodeDevicesResponseDataInnerOsdDaemonsInnerStatusCurrentEnum,
  CosIconTextType
> = {
  up: 'positive',
  down: 'error',
  error: 'error',
  warning: 'warning',
}

export const DaemonsInfo = (props: DaemonsInfoProps) => {
  const { daemons } = props

  return (
    <div className="flex flex-col gap-y-1.5">
      {daemons.map((daemon) => (
        <div key={daemon.id} className="flex items-center gap-x-1.5">
          <span className="primary-body4 text-functional-text">
            {daemon.id}
          </span>
          <CosIconText type={iconTypeMap[daemon.status.current]}>
            {daemon.status.current}
          </CosIconText>
        </div>
      ))}
    </div>
  )
}
