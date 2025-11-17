import { MODEL_UPLOAD_FILE_TYPE } from '../../storagesModelsPageUtils'
import { UploadButton } from '../UploadButton/UploadButton'
import { useStorageModelTable } from './useStorageModelTable'
import { ReplaceConfirmModal } from './ReplaceConfirmModal'

export type TableActions = {
  actions: ReturnType<typeof useStorageModelTable>['tableActions']
}

export const TableActions = (props: TableActions) => {
  const { actions } = props
  const { importModelAction, replaceModelListAction } = actions

  return (
    <>
      <div className="flex items-center gap-x-2">
        <UploadButton
          type="secondary"
          usage="text-only"
          size="sm"
          accept={MODEL_UPLOAD_FILE_TYPE}
          loading={importModelAction.isLoading}
          disabled={importModelAction.disabled}
          onFileSelect={importModelAction.upload}
        >
          {importModelAction.title}
        </UploadButton>
        <UploadButton
          type="secondary"
          usage="text-only"
          size="sm"
          accept={MODEL_UPLOAD_FILE_TYPE}
          loading={replaceModelListAction.isLoading}
          disabled={replaceModelListAction.disabled}
          onFileSelect={replaceModelListAction.openConfirmModal}
        >
          {replaceModelListAction.title}
        </UploadButton>
      </div>
      <ReplaceConfirmModal
        isOpen={replaceModelListAction.isConfirmModalOpen}
        isLoading={replaceModelListAction.isLoading}
        onConfirm={replaceModelListAction.confirm}
        onCancel={replaceModelListAction.closeConfirmModal}
      />
    </>
  )
}
