import { MODEL_UPLOAD_FILE_TYPE } from '../../storagesModelsPageUtils'
import { UploadButton } from '../UploadButton/UploadButton'

export type TableActions = {
  actions: {
    title: string
    isLoading: boolean
    disabled: boolean
    upload: (file: File) => Promise<unknown>
  }[]
}

export const TableActions = (props: TableActions) => {
  const { actions } = props

  return (
    <div className="flex items-center gap-x-2">
      {actions.map((action, index) => (
        <UploadButton
          key={index}
          type="secondary"
          usage="text-only"
          size="sm"
          accept={MODEL_UPLOAD_FILE_TYPE}
          loading={action.isLoading}
          disabled={action.disabled}
          onFileSelect={action.upload}
        >
          {action.title}
        </UploadButton>
      ))}
    </div>
  )
}
