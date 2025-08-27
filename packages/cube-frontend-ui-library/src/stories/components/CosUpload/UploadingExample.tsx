import { CosHyperlink, CosUpload } from '@cube-frontend/ui-library'

export const UploadingExample = () => {
  return (
    <CosUpload
      buttonText="Upload file"
      leftSlot={
        <div className="primary-body2 text-functional-text">
          OS: Operating System
        </div>
      }
      rightSlot={
        <CosHyperlink variant="text-inline" href="#" target="_blank">
          View example
        </CosHyperlink>
      }
      isUploading={true}
    >
      <CosUpload.ProgressBar
        fileName="/Scripts/fake_automation.command"
        progress={87}
        onAbortClick={() => alert('Abort upload')}
      />
    </CosUpload>
  )
}
