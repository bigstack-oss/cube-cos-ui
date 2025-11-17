import { MouseEventHandler, useRef } from 'react'
import { CosButton, CosButtonProps } from '@cube-frontend/ui-library'
import { UploadInput } from './UploadInput'
import { MODEL_UPLOAD_FILE_TYPE } from '../../storagesModelsPageUtils'

export type UploadButton = CosButtonProps & {
  accept?: string
  onFileSelect: (file: File) => void
}

export const UploadButton = (props: UploadButton) => {
  const { accept, onFileSelect, onClick, ...buttonProps } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const selectFile = () => {
    inputRef.current?.click()
  }

  const handleClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onClick?.(e)
    selectFile()
  }

  return (
    <>
      <CosButton {...buttonProps} onClick={handleClick} />
      <UploadInput
        ref={inputRef}
        accept={MODEL_UPLOAD_FILE_TYPE}
        onFileSelect={onFileSelect}
      />
    </>
  )
}
