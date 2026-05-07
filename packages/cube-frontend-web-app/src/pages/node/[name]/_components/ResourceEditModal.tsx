import { CosModal } from '@cube-frontend/ui-library'
import { ResourceRow } from './NodeResources'

export type ResourceEditModalProps = {
  isModalOpen: boolean
  resource: ResourceRow | undefined
  onClose: () => void
}

// TODO
export const ResourceEditModal = (props: ResourceEditModalProps) => {
  const { isModalOpen, onClose } = props

  return (
    <CosModal isOpen={isModalOpen} title={''} onCloseClick={onClose}>
      Edit Modal
    </CosModal>
  )
}
