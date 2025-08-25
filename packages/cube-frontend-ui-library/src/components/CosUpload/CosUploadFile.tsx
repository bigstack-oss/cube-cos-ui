import { cva } from 'class-variance-authority'
import { twMerge } from 'tailwind-merge'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'
import CircleFill from '@cube-frontend/ui-library/icons/monochrome/circle_fill.svg?react'
import Incomplete from '@cube-frontend/ui-library/icons/monochrome/incomplete.svg?react'

const text = cva('primary-body2 font-medium', {
  variants: {
    disabled: {
      true: 'text-functional-text-light',
      false: 'text-functional-title',
    },
  },
})

const cancelButton = cva('icon-md', {
  variants: {
    disabled: {
      true: 'cursor-default text-functional-disable-text',
      false: 'cursor-pointer text-functional-text',
    },
  },
})

type CosUploadFileProps = {
  /**
   * @default false
   */
  disabled?: boolean
  children: string
  onCancel: () => void
}

export const CosUploadFile = (props: CosUploadFileProps) => {
  const { children, disabled = false, onCancel } = props

  const renderIcon = () => {
    return disabled ? (
      <Incomplete className="icon-md text-functional-disable-text" />
    ) : (
      <CircleFill className="icon-md text-status-positive" />
    )
  }

  return (
    <div className="flex items-center justify-between rounded-[5px] border border-functional-border-divider p-4">
      <div className="flex items-center gap-[9px]">
        {renderIcon()}
        <p className={twMerge(text({ disabled }))}>{children}</p>
      </div>
      <X className={twMerge(cancelButton({ disabled }))} onClick={onCancel} />
    </div>
  )
}
