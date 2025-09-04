import { useRef } from 'react'
import { CosButton, CosOverflowMenu } from '@cube-frontend/ui-library'
import DeleteIcon from '@cube-frontend/ui-library/icons/monochrome/delete.svg?react'
import OverflowMenuHorizontal from '@cube-frontend/ui-library/icons/monochrome/overflow_menu_horizontal.svg?react'
import {
  MODEL_UPLOAD_FILE_TYPE,
  StorageModelRow,
} from '../../storagesModelsPageUtils'
import { UploadInput } from '../UploadButton/UploadInput'

export type RowActionsProps = {
  row: StorageModelRow
  onReplace: (row: StorageModelRow, file: File) => Promise<unknown>
  onRemove: (row: StorageModelRow) => void
}
export const RowActions = (props: RowActionsProps) => {
  const { row, onReplace, onRemove } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFile = () => {
    inputRef.current?.click()
  }

  const handleFileSelect = async (file: File) => onReplace(row, file)

  return (
    <div className="flex items-center justify-end gap-x-2">
      <CosButton
        type="ghost"
        usage="icon-only"
        size="md"
        Icon={DeleteIcon}
        disabled={row.state.isProcessing}
        onClick={() => onRemove(row)}
      />
      <CosOverflowMenu
        triggerElement={
          <OverflowMenuHorizontal className="icon-md cursor-pointer" />
        }
      >
        <CosOverflowMenu.Item
          title="Upload to replace"
          type="plain"
          disabled={row.state.isProcessing}
          onClick={selectFile}
        />
      </CosOverflowMenu>
      <UploadInput
        ref={inputRef}
        accept={MODEL_UPLOAD_FILE_TYPE}
        onFileSelect={handleFileSelect}
      />
    </div>
  )
}
