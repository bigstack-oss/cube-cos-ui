import { CosHyperlink, CosUpload } from '@cube-frontend/ui-library'

export const UploadedExample = () => {
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
    >
      <CosUpload.File onCancel={() => alert('Clear uploaded file')}>
        /Scripts/fake_automation.command
      </CosUpload.File>
    </CosUpload>
  )
}
