import { CosLogConsole, CosModal } from '@cube-frontend/ui-library'
import { StorageModelRow } from '../../storagesModelsPageUtils'

export type ViewModalProps = {
  row?: StorageModelRow
  isOpen: boolean
  onClose: () => void
}

const formatModel = (row: StorageModelRow) => JSON.stringify(row, null, 2)

export const ViewModal = (props: ViewModalProps) => {
  const { isOpen, row, onClose } = props

  const modelName = row ? `${row.vendor} ${row.model}` : ''

  return (
    <CosModal
      isOpen={isOpen}
      title="Model Details"
      size="md"
      isActionButtonVisible={false}
      onCloseClick={onClose}
    >
      {row && (
        <CosLogConsole title={{ label: modelName }}>
          {formatModel(row)}
        </CosLogConsole>
      )}
    </CosModal>
  )
}
