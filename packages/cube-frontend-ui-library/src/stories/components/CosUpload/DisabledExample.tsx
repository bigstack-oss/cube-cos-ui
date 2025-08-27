import { CosHyperlink, CosUpload } from '@cube-frontend/ui-library'
import { noop } from 'lodash'

export const DisabledExample = () => {
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
      disabled={true}
    >
      <CosUpload.File disabled={true} onCancel={noop}>
        /Scripts/fake_automation.command
      </CosUpload.File>
    </CosUpload>
  )
}
