import { CosHyperlink, CosUpload } from '@cube-frontend/ui-library'

export const ErrorExample = () => {
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
      <CosUpload.Error message="Failed to upload /Scripts/fake_automation.command, reason: Something went wrong." />
    </CosUpload>
  )
}
