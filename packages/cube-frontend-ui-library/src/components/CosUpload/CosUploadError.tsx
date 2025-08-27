import { CosInlineNotification } from '@cube-frontend/ui-library'

type CosUploadErrorProps = {
  message: string
  onClose?: () => void
}

export const CosUploadError = (props: CosUploadErrorProps) => {
  const { message, onClose } = props

  return (
    <CosInlineNotification type="error" title={message} onClose={onClose} />
  )
}
