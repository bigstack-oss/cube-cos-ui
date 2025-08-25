import React, { ChangeEventHandler, useRef } from 'react'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { CosButton } from '../CosButton/CosButton'
import { CosUploadFile } from './CosUploadFile'

type CosUploadProps = {
  buttonText: string
  inputId?: string
  accept?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  errorMessage?: string
  disabled?: boolean
  children?: React.ReactNode
  onFileChange?: (file: File | null) => void | Promise<void>
}

export const CosUpload = (props: CosUploadProps) => {
  const {
    buttonText,
    inputId,
    accept,
    leftSlot,
    rightSlot,
    errorMessage,
    disabled,
    children,
    onFileChange,
  } = props

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleButtonClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0] || null

    if (onFileChange) {
      onFileChange(file)
    }
    // Allow re-uploading the same file
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CosButton
            size="lg"
            type="secondary"
            usage="icon-left"
            disabled={disabled}
            Icon={UploadIcon}
            onClick={handleButtonClick}
          >
            {buttonText}
          </CosButton>
          <input
            ref={fileInputRef}
            id={inputId}
            type="file"
            accept={accept}
            disabled={disabled}
            onChange={handleFileChange}
            className="hidden"
          />
          {leftSlot}
        </div>
        {rightSlot}
      </div>
      {errorMessage && (
        <p className="primary-body3 text-status-negative">{errorMessage}</p>
      )}
      {children}
    </div>
  )
}

CosUpload.File = CosUploadFile
