import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import React, { ChangeEventHandler, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { CosButton } from '../CosButton/CosButton'
import { CosUploadError } from './CosUploadError'
import { CosUploadFile } from './CosUploadFile'
import { CosUploadProgressBar } from './CosUploadProgressBar'

type CosUploadProps = {
  className?: string
  buttonText: string
  inputId?: string
  accept?: string
  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  /**
   * @default false
   */
  isUploading?: boolean
  /**
   * @default false
   */
  disabled?: boolean
  children?: React.ReactNode
  onFileChange?: (file: File | null) => void | Promise<void>
}

export const CosUpload = (props: CosUploadProps) => {
  const {
    className,
    buttonText,
    inputId,
    accept,
    leftSlot,
    rightSlot,
    isUploading = false,
    disabled = false,
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
    <div className={twMerge('flex flex-col gap-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <CosButton
            size="lg"
            type="secondary"
            usage="icon-left"
            loading={isUploading}
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
            disabled={isUploading || disabled}
            onChange={handleFileChange}
            className="hidden"
          />
          {leftSlot}
        </div>
        {rightSlot}
      </div>
      {children}
    </div>
  )
}

CosUpload.File = CosUploadFile
CosUpload.ProgressBar = CosUploadProgressBar
CosUpload.Error = CosUploadError
