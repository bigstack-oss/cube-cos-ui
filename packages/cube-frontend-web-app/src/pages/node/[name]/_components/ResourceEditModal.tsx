import { CosModal } from '@cube-frontend/ui-library'
import { GpuResourceRow } from './NodeGpuResources/NodeGpuResources'

export type ResourceEditModalProps = {
  isModalOpen: boolean
  resource: GpuResourceRow | undefined
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
