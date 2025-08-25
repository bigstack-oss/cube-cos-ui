import React, { cloneElement } from 'react'
import { CosButtonProps } from '../CosButton/CosButton'
import UploadIcon from '@cube-frontend/ui-library/icons/monochrome/upload.svg?react'
import { CosUploadFile } from './CosUploadFile'

export type CosUploadProps = {
  disabled: boolean
  button: React.ReactElement<CosButtonProps>
  input: React.ReactElement<HTMLInputElement>

  leftSlot?: React.ReactNode
  rightSlot?: React.ReactNode
  children?: React.ReactNode
  errorMessage?: string
}

export const CosUpload = (props: CosUploadProps) => {
  const {
    disabled,
    button: buttonProps,
    input: inputProps,
    leftSlot,
    rightSlot,
    children,
    errorMessage,
  } = props

  const button = cloneElement(buttonProps, {
    size: 'lg',
    type: 'secondary',
    usage: 'icon-left',
    disabled,
    Icon: UploadIcon,
  })

  const input = cloneElement(inputProps, {
    disabled,
    className: 'hidden',
  })

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {button}
          {input}
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
