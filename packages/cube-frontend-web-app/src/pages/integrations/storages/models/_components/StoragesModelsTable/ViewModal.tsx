import YAML from 'yaml'
import { CosLogConsole, CosModal } from '@cube-frontend/ui-library'
import { StorageModelRow } from '../../storagesModelsPageUtils'

export type ViewModalProps = {
  row?: StorageModelRow
  isOpen: boolean
  onClose: () => void
}

const formatModel = (row: StorageModelRow) => YAML.stringify(row)

export const ViewModal = (props: ViewModalProps) => {
  const { isOpen, row, onClose } = props

  const name = row ? row.driver : ''

  return (
    <CosModal
      isOpen={isOpen}
      title="Model Details"
      size="md"
      isActionButtonVisible={false}
      onCloseClick={onClose}
    >
      {row && (
        <CosLogConsole title={{ label: name }}>
          {formatModel(row)}
        </CosLogConsole>
      )}
    </CosModal>
  )
}
