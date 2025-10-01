import { CosModal } from '@cube-frontend/ui-library'
import { joinHostNames } from './utils'

export type HostListModalProps = {
  isOpen: boolean
  hostNames: string[]
  onCloseClick: () => void
}

export const HostListModal = (props: HostListModalProps) => {
  const { isOpen, hostNames, onCloseClick } = props
  return (
    <CosModal
      title="Hosts"
      size="sm"
      isOpen={isOpen}
      isActionButtonVisible={false}
      onCloseClick={onCloseClick}
    >
      <div className="primary-body4 text-functional-text">
        {joinHostNames(hostNames)}
      </div>
    </CosModal>
  )
}
