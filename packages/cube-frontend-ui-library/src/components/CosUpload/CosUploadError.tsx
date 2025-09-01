import InformationCircle from '@cube-frontend/ui-library/icons/monochrome/information_circle.svg?react'
import X from '@cube-frontend/ui-library/icons/monochrome/x.svg?react'

type CosUploadErrorProps = {
  message: string
  onClose?: () => void
}

export const CosUploadError = (props: CosUploadErrorProps) => {
  const { message, onClose } = props

  return (
    <div className="flex items-center gap-x-2 rounded-[5px] border border-status-negative p-4">
      <InformationCircle className="icon-md shrink-0 text-status-negative" />
      <div className="primary-body2 grow truncate font-medium text-functional-title">
        {message}
      </div>
      <button
        type="button"
        className="flex shrink-0 items-center justify-center"
        onClick={onClose}
      >
        <X className="icon-md text-functional-text" />
      </button>
    </div>
  )
}
